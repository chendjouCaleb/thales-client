import {Injectable} from "@angular/core";
import {SERVER_URL} from "../http";
import {Agency, Customer, Debt, Space} from "../../entities";
import { HttpClient } from "@angular/common/http";
import {firstValueFrom, Observable, Subject} from "rxjs";
import {DebtAddModel, DebtIncomeAddModel} from "@app/models";
import {DebtRangeViewModel} from "@entities/view-models/DebtRangeViewModel";
import {Money} from "@entities/money";
import {DebtIncome} from "@entities/finance/debt-income";
import {DateTime} from "luxon";

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  private url = `${SERVER_URL}/finance/debts`;

  private _debtAdd = new Subject<Debt>();
  get debtAdd(): Observable<Debt> { return this._debtAdd.asObservable() }

  private _debtDelete = new Subject<Debt>();
  get debtDelete(): Observable<Debt> { return this._debtDelete.asObservable() }

  private _debtUpdate = new Subject<Debt>();
  get debtUpdate(): Observable<Debt> { return this._debtUpdate.asObservable() }

  constructor(private _httpClient: HttpClient) {}

  async addAsync(space: Space, agency: Agency, customer: Customer, model: DebtAddModel): Promise<Debt> {
    const params = {
      customerId: customer.id,
      spaceId: space.id,
      agencyId: agency?.id
    };

    const call = this._httpClient.post<Debt>(`${this.url}`, model, {params});
    let debt = new Debt(await firstValueFrom(call));
    debt = await this.getAsync(debt.id)

    this._debtAdd.next(debt);
    return debt;
  }


  async addIncomeAsync(debt: Debt, model: DebtIncomeAddModel) {
    const call = this._httpClient.post<DebtIncome>(`${this.url}/${debt.id}/incomes`, model, {});
    let debtIncome = new DebtIncome(await firstValueFrom(call));

    return debtIncome;
  }


  async listAsync(params: any = {}): Promise<DebtRangeViewModel> {
    const call = this._httpClient.get<any[]>(`${this.url}`, {params});
    let range = new DebtRangeViewModel(await firstValueFrom(call));
    range.hydrate()

    return range
  }


  async getAsync(id: string): Promise<Debt> {
    const call = this._httpClient.get<Debt>(`${this.url}/${id}`);
    return new Debt(await firstValueFrom(call));
  }

  async pdf(id: number): Promise<void> {
    const call = this._httpClient.get<Debt>(`${this.url}/${id}/pdf`);
    await firstValueFrom(call);
  }

  async deleteAsync(debt: Debt): Promise<void> {
    const call = this._httpClient.delete<void>(`${this.url}/${debt.id}`);
    await firstValueFrom(call);
    this._debtDelete.next(debt);
  }


  async changeAmountAsync(debt: Debt, amount: Money): Promise<void> {
    const params = { amount: amount.toString() }
    const call = this._httpClient.put<void>(`${this.url}/${debt.id}/amount`, {}, {params});
    await firstValueFrom(call);
    debt.amount = amount;
    this._debtUpdate.next(debt);
  }

  async changeDetailsAsync(debt: Debt, details: string): Promise<void> {
    const params = { details }
    const call = this._httpClient.put<void>(`${this.url}/${debt.id}/details`, {}, {params});
    await firstValueFrom(call);
    debt.details = details;
    this._debtUpdate.next(debt);
  }

  async changeReasonAsync(debt: Debt, reason: string): Promise<void> {
    const params = { reason }
    const call = this._httpClient.put<void>(`${this.url}/${debt.id}/reason`, {}, {params});
    await firstValueFrom(call);
    debt.reason = reason;
    this._debtUpdate.next(debt);
  }

  async changeExpireAtAsync(debt: Debt, expireAt?: Date): Promise<void> {
    const params = { expireAt:expireAt.toString() }
    const call = this._httpClient.put<void>(`${this.url}/${debt.id}/expire-at`, {}, {params});
    await firstValueFrom(call);
    if(expireAt){
      debt.expireAt = DateTime.fromJSDate(expireAt)
    }else {
      debt.expireAt = null
    }

    this._debtUpdate.next(debt);
  }

  async changeDoneAtAsync(debt: Debt, doneAt?: Date): Promise<void> {
    const params = { doneAt:doneAt.toString() }
    const call = this._httpClient.put<void>(`${this.url}/${debt.id}/done-at`, {}, {params});
    await firstValueFrom(call);
    if(doneAt){
      debt.doneAt = DateTime.fromJSDate(doneAt)
    }else {
      debt.doneAt = null
    }

    this._debtUpdate.next(debt);
  }
}
