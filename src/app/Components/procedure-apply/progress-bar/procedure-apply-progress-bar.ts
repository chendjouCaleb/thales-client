import {Component, ElementRef, Input, OnInit} from "@angular/core";
import {ProcedureApply} from "@entities/procedure-apply";

@Component({
  selector: 'ProcedureApplyProgressBar',
  templateUrl: 'procedure-apply-progress-bar.html',
  styleUrl: 'procedure-apply-progress-bar.scss',
  standalone: true
})
export class ProcedureApplyProgressBar implements OnInit {

  @Input()
  procedureApply: ProcedureApply;

  get host(): HTMLElement { return this.elementRef.nativeElement }

  get width(): number {
    return this.host.offsetWidth
  }

  constructor(public readonly elementRef: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
    if(!this.procedureApply) {
      throw new Error('this.procedureApply should not be null')
    }
  }

}
