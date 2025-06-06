import {Injectable} from "@angular/core";
import {SERVER_URL} from "../http";
import {Agency, Customer, Debt, Space} from "../../entities";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {DebtAddModel, DebtIncomeAddModel} from "@app/models";
import {DebtRangeViewModel} from "@entities/view-models/DebtRangeViewModel";
import {Money} from "@entities/money";
import {DebtIncome} from "@entities/finance/debt-income";
import {DateTime} from "luxon";
import {DebtEventStore} from "@app/services/debt-event-store";

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  private url = `${SERVER_URL}/finance/debts`;

  constructor(private _httpClient: HttpClient, private _debtEventStore: DebtEventStore) {}

  async addAsync(space: Space, agency: Agency, customer: Customer, model: DebtAddModel): Promise<Debt> {
    const params = {
      customerId: customer.id,
      spaceId: space.id,
      agencyId: agency?.id
    };

    const call = this._httpClient.post<Debt>(`${this.url}`, model, {params});
    let debt = new Debt(await firstValueFrom(call));
    debt = await this.getAsync(debt.id)

    this._debtEventStore.emitDebtAdd(debt);
    return debt;
  }


  async addIncomeAsync(debt: Debt, model: DebtIncomeAddModel) {
    const call = this._httpClient.post<DebtIncome>(`${this.url}/${debt.id}/incomes`, model, {});
    let debtIncome = new DebtIncome(await firstValueFrom(call));
    this._debtEventStore.emitDebtIncomeAdd(debtIncome)
    return debtIncome;
  }

  async deleteIncomeAsync(debtIncome: DebtIncome) {
    const call = this._httpClient.delete<void>(`${this.url}/incomes/${debtIncome.id}`);
    await firstValueFrom(call);
    this._debtEventStore.emitDebtIncomeDelete(debtIncome);
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
    this._debtEventStore.emitDebtDelete(debt);
  }


  async changeAmountAsync(debt: Debt, amount: Money): Promise<void> {
    const params = { amount: amount.toString() }
    const call = this._httpClient.put<void>(`${this.url}/${debt.id}/amount`, {}, {params});
    await firstValueFrom(call);
    debt.amount = amount;
    this._debtEventStore.emitDebtUpdate(debt);
  }

  async changeDetailsAsync(debt: Debt, details: string): Promise<void> {
    const params = { details }
    const call = this._httpClient.put<void>(`${this.url}/${debt.id}/details`, {}, {params});
    await firstValueFrom(call);
    debt.details = details;
    this._debtEventStore.emitDebtUpdate(debt);
  }

  async changeReasonAsync(debt: Debt, reason: string): Promise<void> {
    const params = { reason }
    const call = this._httpClient.put<void>(`${this.url}/${debt.id}/reason`, {}, {params});
    await firstValueFrom(call);
    debt.reason = reason;
    this._debtEventStore.emitDebtUpdate(debt);
  }

  async changeExpireAtAsync(debt: Debt, expireAt?: Date): Promise<void> {
    const params = { expireAt:expireAt.toISOString() }
    const call = this._httpClient.put<void>(`${this.url}/${debt.id}/expire-at`, {}, {params});
    await firstValueFrom(call);
    if(expireAt){
      debt.expireAt = DateTime.fromJSDate(expireAt)
    }else {
      debt.expireAt = null
    }

    this._debtEventStore.emitDebtUpdate(debt);
  }

  async changeDoneAtAsync(debt: Debt, doneAt?: Date): Promise<void> {
    const params = { doneAt:doneAt.toISOString() }
    const call = this._httpClient.put<void>(`${this.url}/${debt.id}/done-at`, {}, {params});
    await firstValueFrom(call);
    if(doneAt){
      debt.doneAt = DateTime.fromJSDate(doneAt)
    }else {
      debt.doneAt = null
    }

    this._debtEventStore.emitDebtUpdate(debt);
  }
}
