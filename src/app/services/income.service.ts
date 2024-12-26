import {Injectable} from "@angular/core";
import {SERVER_URL} from "../http";
import {Agency, Customer, Income, Space} from "../../entities";
import { HttpClient } from "@angular/common/http";
import {firstValueFrom, Observable, Subject} from "rxjs";
import {IncomeAddModel} from "@app/models";
import {IncomeRangeViewModel} from "@entities/view-models/IncomeRangeViewModel";
import {Money} from "@entities/money";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private url = `${SERVER_URL}/finance/incomes`;

  private _incomeAdd = new Subject<Income>();
  get incomeAdd(): Observable<Income> { return this._incomeAdd.asObservable() }

  private _incomeDelete = new Subject<Income>();
  get incomeDelete(): Observable<Income> { return this._incomeDelete.asObservable() }

  private _incomeUpdate = new Subject<Income>();
  get incomeUpdate(): Observable<Income> { return this._incomeUpdate.asObservable() }

  constructor(private _httpClient: HttpClient) {}

  async addAsync(space: Space, agency: Agency, customer: Customer, model: IncomeAddModel): Promise<Income> {
    const params = {
      customerId: customer.id,
      spaceId: space.id,
      agencyId: agency?.id
    };

    const call = this._httpClient.post<Income>(`${this.url}`, model, {params});
    let income = new Income(await firstValueFrom(call));
    income = await this.getAsync(income.id)

    this._incomeAdd.next(income);
    return income;
  }


  async listAsync(params: any = {}): Promise<IncomeRangeViewModel> {
    const call = this._httpClient.get<any[]>(`${this.url}`, {params});
    let range = new IncomeRangeViewModel(await firstValueFrom(call));
    range.hydrate()

    return range
  }


  async getAsync(id: string): Promise<Income> {
    const call = this._httpClient.get<Income>(`${this.url}/${id}`);
    return new Income(await firstValueFrom(call));
  }

  async pdf(id: number): Promise<void> {
    const call = this._httpClient.get<Income>(`${this.url}/${id}/pdf`);
    await firstValueFrom(call);
  }

  async deleteAsync(income: Income): Promise<void> {
    const call = this._httpClient.delete<void>(`${this.url}/${income.id}`);
    await firstValueFrom(call);
    this._incomeDelete.next(income);
  }


  async changeAmountAsync(income: Income, amount: Money): Promise<void> {
    const params = { amount: amount.toString() }
    const call = this._httpClient.put<void>(`${this.url}/${income.id}/amount`, {}, {params});
    await firstValueFrom(call);
    income.amount = amount;
    this._incomeUpdate.next(income);
  }

  async changeDetailsAsync(income: Income, details: string): Promise<void> {
    const params = { details }
    const call = this._httpClient.put<void>(`${this.url}/${income.id}/details`, {}, {params});
    await firstValueFrom(call);
    income.details = details;
    this._incomeUpdate.next(income);
  }

  async changeReasonAsync(income: Income, reason: string): Promise<void> {
    const params = { reason }
    const call = this._httpClient.put<void>(`${this.url}/${income.id}/reason`, {}, {params});
    await firstValueFrom(call);
    income.reason = reason;
    this._incomeUpdate.next(income);
  }
}
