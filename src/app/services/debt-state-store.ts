import {Observable, Subject} from "rxjs";
import {Debt} from "@entities/finance";

export class DebtStateStore {
  private _debtAdd = new Subject<Debt>();
  get debtAdd(): Observable<Debt> { return this._debtAdd.asObservable() }
}
