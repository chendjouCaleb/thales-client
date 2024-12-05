import {AfterViewInit, Component, ElementRef, Input, isDevMode, OnInit, ViewChild} from "@angular/core";
import {TraceService} from "@app/trace";
import {Event} from '../models';
import {sleep, Task} from "@app/utils";
import {isVisibleElement} from "@app/utils/dom";


const EVENT_RANGE_SIZE = isDevMode() ? 10 : 30;

@Component({
  templateUrl: 'event-list.html',
  selector: 'event-list, [event-list]'
})
export class EventList implements AfterViewInit {
  @Input()
  params: any = {};

  @ViewChild('rangeObserverThumb')
  rangeObserverThumbRef: ElementRef<HTMLElement>

  events: Event[] = [];
  total: number = 0;

  get hasMore(): boolean { return this.events.length < this.total }

  getFirstRangeTask = new Task(async () => {
    let params = {...this.params,
      take: EVENT_RANGE_SIZE,
      skip: this.events.length
    }
    let range = await this._traceService.listAsync(params);
    this.events.push(...range.events)
    this.total = range.total
  });

  getRangeTask = new Task(async () => {
    let from = this.events.length;
    let params = {...this.params, includeCustomer: true, includeEmployee: true, includeAgency: true,
      take: EVENT_RANGE_SIZE,
      skip: this.events.length
    }
    let range = await this._traceService.listAsync(params);
    this.events.push(...range.events)
    this.total = range.total;
    console.log(`Load events range: [${from}, ${this.events.length}]`)
  })


  constructor(private _traceService: TraceService) {}

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

    intersectionObserver.observe(this.rangeObserverThumbRef.nativeElement);

    Promise.resolve().then(() => {
      this.loadFirstRange().then()
    })

  }


  async loadFirstRange() {
    await this.getFirstRangeTask.launch()
    await sleep(500)
    let visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    while (visible && this.hasMore) {
      await this.getRangeTask.launch()
      await sleep(500)
      visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    }
  }

  async loadRange() {
    await this.getRangeTask.launch()
    await sleep(200)
    let visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    while (visible && this.hasMore) {
      await this.getRangeTask.launch()
      await sleep(200)
      visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    }
  }
}
