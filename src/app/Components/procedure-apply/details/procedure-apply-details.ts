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
  CircleCheckBigIcon,
  LockIcon,
  LockOpenIcon,
  LucideAngularModule,
  Trash2Icon,
  UndoIcon
} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {ExpenseService} from "@app/services/expense.service";
import {DebtEventStore} from "@app/services/debt-event-store";

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
  icons = {
    ArrowLeftIcon, Trash2Icon, UndoIcon, CircleCheckBigIcon,
    LockOpenIcon, LockIcon
  }

  @Input()
  procedureApplyId: number;

  procedureApply: ProcedureApply

  getProcedureApply = new Task(async () => {
    this.procedureApply = await this._service.getByIdAsync(this.procedureApplyId);
    this.procedureApply.procedureApplySteps.forEach(pa => pa.procedureApply = this.procedureApply);
  });

  constructor(private _service: ProcedureApplyService,
              private _expenseService: ExpenseService,
              private _controller: ProcedureApplyController,
              private _debtEventStore: DebtEventStore,
              public readonly location: Location) {
  }

  async ngOnInit() {
    await this.getProcedureApply.launch()

    this._expenseService.expenseAdd.subscribe(expense => {
      console.log('expense: ' + expense)
      if (this.procedureApply.shouldContainsExpense(expense)) {
        this.procedureApply.addExpense(expense);
        //this.procedureApply.procedureApplySteps.forEach(step => step.addExpense(expense))
      }
    });

    this._expenseService.expenseDelete.subscribe(expense => {
      if (this.procedureApply.containsExpense(expense)) {
        this.procedureApply.removeExpense(expense)
        this.procedureApply.procedureApplySteps.forEach(step => step.removeExpense(expense))
      }
    });

    this._debtEventStore.debtIncomeAdd.subscribe(debtIncome => {
      this.procedureApply.addIncome(debtIncome.income);
      this.procedureApply.procedureApplySteps.forEach(step => step.addIncome(debtIncome.income));
    });

    this._debtEventStore.debtIncomeDelete.subscribe(debtIncome => {
      this.procedureApply.removeIncome(debtIncome.income);
      this.procedureApply.procedureApplySteps.forEach(step => step.removeIncome(debtIncome.income));
    });
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
