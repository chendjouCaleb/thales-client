import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  isDevMode,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {ProcedureApply} from "@entities/procedure-apply";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {sleep, Task} from "@app/utils";
import {isVisibleElement} from "@app/utils/dom";
import {ProcedureApplyProgressBar} from "@app/Components/procedure-apply/progress-bar/procedure-apply-progress-bar";
import {MyBadge} from "@app/NeoUI";


const PROCEDURE_APPLIES_RANGE_SIZE = isDevMode() ? 5 : 30;

@Component({
  selector: 'procedure-apply-list',
  templateUrl: 'procedure-apply-list.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatProgressSpinner,
    NgForOf,
    RouterLink,
    NgIf,
    ProcedureApplyProgressBar,
    MyBadge
  ],
  standalone: true
})
export class ProcedureApplyList implements OnInit, AfterViewInit {
  @Input()
  params: any = {};

  @ViewChild('rangeObserverThumb')
  rangeObserverThumbRef: ElementRef<HTMLElement>

  @Output()
  rowClick = new EventEmitter<ProcedureApply>()

  procedureApplies: ProcedureApply[] = [];

  total: number = 0;

  get hasMore(): boolean { return this.procedureApplies.length < this.total}

  getFirstRangeTask = new Task(async () => {
    let params = {...this.params,
      take: PROCEDURE_APPLIES_RANGE_SIZE,
      skip: this.procedureApplies.length
    }
    let range = await this._service.listAsync(params);
    this.procedureApplies.push(...range.procedureApplies)
    this.total = range.total
    this._changeDetector.markForCheck()
    console.log("Procedure applies first range loaded")
  });

  getRangeTask = new Task(async () => {
    let from = this.procedureApplies.length;
    let params = {...this.params,
      take: PROCEDURE_APPLIES_RANGE_SIZE,
      skip: this.procedureApplies.length
    }
    let range = await this._service.listAsync(params);
    this.procedureApplies.push(...range.procedureApplies)
    this.total = range.total;
    this._changeDetector.markForCheck()
    console.log(`Load procedure applies range: [${from}, ${this.procedureApplies.length}]`)
  })


  constructor(private _service: ProcedureApplyService,
              private _changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    let intersectionObserver = new IntersectionObserver(entries => {
      console.log('Intersection append')
      if (entries[0].intersectionRatio <= 0) return;
      if(this.getFirstRangeTask.success && !this.getRangeTask.loading && this.hasMore) {
        this.loadRange().then()
      }
    }, {root: null, threshold: 0.1});

    intersectionObserver.observe(this.rangeObserverThumbRef.nativeElement)
  }

  ngOnInit() {
     this.loadFirstRange().then()
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



  async reload() {
    this.total = 0
    this.procedureApplies = []
    await this.loadFirstRange()
  }

  add(...items: ProcedureApply[]) {
    this.procedureApplies.unshift(...items);
    this._changeDetector.markForCheck()
  }
}
