import {Component, ElementRef, Input, isDevMode, OnInit, ViewChild} from "@angular/core";
import {Payment, PlaneTicket} from "../../../../entities";
import {PlaneTicketService} from "@app/services";
import {MatTableDataSource} from "@angular/material/table";
import {PlaneTicketUIService} from "@app/Components";
import {sleep, Task} from "@app/utils";
import {isVisibleElement} from "@app/utils/dom";
import {icons} from "lucide-angular";

const ITEMS_RANGE_SIZE = isDevMode() ? 10 : 30;
@Component({
  templateUrl: 'plane-ticket-list.html',
  selector: 'PlaneTicketList'
})
export class PlaneTicketList implements OnInit {
  @Input()
  params: any = {}

  @Input()
  displayedColumns: string[] = [];
  columns: string[] = [ 'id', 'code', 'departureCountry', 'arrivalCountry', 'customer', 'agency', 'employee', 'createdAt', 'action'];

  @ViewChild('rangeObserverThumb')
  rangeObserverThumbRef: ElementRef<HTMLElement>

  orderby: String[] = ["ID", "DESC"]
  planeTickets: PlaneTicket[] = []
  total: number = 0;

  get hasMore(): boolean { return this.planeTickets.length < this.total}

  getFirstRangeTask = new Task(async () => {
    let params = {...this.params,
      take: ITEMS_RANGE_SIZE,
      skip: this.planeTickets.length
    }
    let range = await this._service.listAsync(params);
    this.planeTickets.push(...range.planeTickets)
    this.total = range.total
  });

  getRangeTask = new Task(async () => {
    let from = this.planeTickets.length;
    let params = {...this.params,
      take: ITEMS_RANGE_SIZE,
      skip: this.planeTickets.length
    }
    let range = await this._service.listAsync(params);
    this.planeTickets.push(...range.planeTickets)
    this.total = range.total;
    console.log(`Load plane tickets range: [${from}, ${this.planeTickets.length}]`)
  })

  constructor(private _service: PlaneTicketService,
              private _uiService: PlaneTicketUIService) {
  }

  async ngOnInit() {
    await this.loadFirstRange()
  }

  ngAfterViewInit() {
    // if(this.parentHost == null) {
    //   throw Error('a ParentHost is required')
    // }
    let intersectionObserver = new IntersectionObserver(entries => {
      console.log('Intersection append')
      if (entries[0].intersectionRatio <= 0) return;
      if(this.getFirstRangeTask.success && !this.getRangeTask.loading && this.hasMore) {
        this.loadRange().then()
      }
    }, {root: null, threshold: 0.1});

    intersectionObserver.observe(this.rangeObserverThumbRef.nativeElement)
  }

  async loadFirstRange() {
    await this.getFirstRangeTask.launch()
    await sleep(50)
    let visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    while (visible && this.hasMore) {
      await this.getRangeTask.launch()
      await sleep(50)
      visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    }
  }

  async loadRange() {
    await this.getRangeTask.launch()
    await sleep(50)
    let visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    while (visible && this.hasMore) {
      await this.getRangeTask.launch()
      await sleep(50)
      visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    }
  }

  async changeOrderBy(value: String) {
    if(value == this.orderby[0]) {
      this.orderby[1] = this.orderby[1] == "ASC" ? "DESC" : "ASC"
    }else {
      this.orderby = [value, "DESC"]
    }
    this.params = {...this.params, orderBy: this.orderby[0], asc: this.orderby[1] === "ASC"}

    await this.reload()
  }

  async reload() {
    this.total = 0
    this.planeTickets = []
    await this.getFirstRangeTask.launch()
  }

  unshift(planeTicket: PlaneTicket) {
    this.planeTickets.unshift(planeTicket);
  }

  remove(planeTicket: PlaneTicket) {
    this.planeTickets = this.planeTickets.filter(p => p.id !== planeTicket.id)
  }

  onClick(row) {
    console.log(row)
  }

  display(name: string) {
    return this.displayedColumns.indexOf(name) > -1
  }

  protected readonly icons = icons;
}
