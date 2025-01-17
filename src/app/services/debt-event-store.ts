import {Observable, Subject} from "rxjs";
import {Debt, DebtCollection, DebtIncome} from "@entities/finance";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class DebtEventStore {
  private _debtAdd = new Subject<Debt>();
  get debtAdd(): Observable<Debt> { return this._debtAdd.asObservable() }

  private _debtDelete = new Subject<Debt>();
  get debtDelete(): Observable<Debt> { return this._debtDelete.asObservable() }

  private _debtUpdate = new Subject<Debt>();
  get debtUpdate(): Observable<Debt> { return this._debtUpdate.asObservable() }

  private _debtIncomeAdd = new Subject<DebtIncome>();
  get debtIncomeAdd(): Observable<DebtIncome> { return this._debtIncomeAdd.asObservable() }

  private _debtIncomeDelete = new Subject<DebtIncome>();
  get debtIncomeDelete(): Observable<DebtIncome> { return this._debtIncomeDelete.asObservable() }


  emitDebtAdd(debt: Debt) {
    this._debtAdd.next(debt)
  }

  emitDebtDelete(debt: Debt) {
    this._debtDelete.next(debt)
  }

  emitDebtUpdate(debt: Debt) {
    this._debtUpdate.next(debt)
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
