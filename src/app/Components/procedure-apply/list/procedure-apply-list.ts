import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {ProcedureApply} from "@entities/procedure-apply";

@Component({
  selector: 'procedure-apply-list',
  templateUrl: 'procedure-apply-list.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcedureApplyList implements OnInit {
  @Input()
  params: any = {};

  isLoading = false;
  applies: ProcedureApply[] = [];


  constructor(private _service: ProcedureApplyService, private _changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.reload().then();
  }

  async reload() {
    this.applies = [];
    this.isLoading = true;
    this._changeDetector.markForCheck();

    this.applies = await this._service.listAsync(this.params);
    this.isLoading = false;
    this._changeDetector.markForCheck();
  }

  add(...items: ProcedureApply[]) {
    this.applies.unshift(...items);
    this._changeDetector.markForCheck()
  }
}
