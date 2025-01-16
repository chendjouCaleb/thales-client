import {Observable, Subject} from "rxjs";
import {Debt, DebtCollection, DebtIncome} from "@entities/finance";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class DebtStateStore {
  private _debtAdd = new Subject<Debt>();
  get debtAdd(): Observable<Debt> { return this._debtAdd.asObservable() }

  private _debtIncomeAdd = new Subject<DebtIncome>();
  get debtIncomeAdd(): Observable<DebtIncome> { return this._debtIncomeAdd.asObservable() }

  private _debtIncomeDelete = new Subject<DebtIncome>();
  get debtIncomeDelete(): Observable<DebtIncome> { return this._debtIncomeDelete.asObservable() }


  emitDebtAdd(debt: Debt) {
    this._debtAdd.next(debt)
  }

  emitDebtIncomeAdd(debtIncome: DebtIncome) {
    this._debtIncomeAdd.next(debtIncome);
  }

  emitDebtIncomeDelete(debtIncome: DebtIncome) {
    this._debtIncomeDelete.next(debtIncome);
  }


  public readonly debts = new DebtCollection()
  observeDebt() {
    console.log('Start observing debt')
    this._debtIncomeAdd.subscribe(debtIncome => {
      this.debts.items.forEach(debt => {
        debt.addIncome(debtIncome);
      })
    })
  }
}
