import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {ProcedureApply, ProcedureApplyStep} from "@entities/procedure-apply";
import {ProcedureApplyService} from "@app/services";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Location, NgIf} from "@angular/common";
import {ProcedureApplyHome} from "@app/Components/procedure-apply/details/home/procedure-apply-home";
import {ProcedureApplyPager} from "@app/Components/procedure-apply/details/procedure-apply-pager";
import {ProcedureApplyController} from "@app/Components";
import {
  ArrowLeftIcon,
  CircleCheckBigIcon, DollarSignIcon, HandCoinsIcon,
  LockIcon,
  LockOpenIcon,
  LucideAngularModule,
  Trash2Icon, UndoIcon, WalletIcon
} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {FinanceOverview} from "@entities/finance/finance-overview";

@Component({
  templateUrl: 'procedure-apply-details.html',
  selector: 'ProcedureApplyDetails, [ProcedureApplyDetails]',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf,
    ProcedureApplyHome,
    ProcedureApplyPager,
    IconButton,
    LucideAngularModule,
    Button
  ],
  encapsulation: ViewEncapsulation.None
})
export class ProcedureApplyDetails implements OnInit {
  icons = { ArrowLeftIcon, Trash2Icon, UndoIcon, CircleCheckBigIcon,
    LockOpenIcon, LockIcon }

  @Input()
  procedureApplyId: number;

  procedureApply: ProcedureApply

  getProcedureApply = new Task(async () => {
    this.procedureApply = await this._service.getByIdAsync(this.procedureApplyId);
    this.procedureApply.procedureApplySteps.forEach(pa => pa.procedureApply = this.procedureApply);

    this.procedureApply.financeOverview = new FinanceOverview(
      this.procedureApply.incomes,
      this.procedureApply.debts,
      this.procedureApply.expenses
    )
  });

  constructor(private _service: ProcedureApplyService,
              private _controller: ProcedureApplyController,
              public readonly location: Location) {}

  async ngOnInit() {
    this.getProcedureApply.launch()

  }

  openDetails(step: ProcedureApplyStep) {
    this._controller.openStep(step)
  }

  lock() {
    this._controller.lock(this.procedureApply)
  }

  unlock() {
    this._controller.unlock(this.procedureApply)
  }

  undone() {
    this._controller.undone(this.procedureApply)
  }

  done() {
    this._controller.done(this.procedureApply)
  }
}
