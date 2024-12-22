import {Injectable} from "@angular/core";
import {SERVER_URL} from "../http";
import {Agency, Customer, Expense, Space} from "../../entities";
import { HttpClient } from "@angular/common/http";
import {firstValueFrom, Observable, Subject} from "rxjs";
import {ExpenseAddModel} from "@app/models";
import {ExpenseRangeViewModel} from "@entities/view-models/ExpenseRangeViewModel";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private url = `${SERVER_URL}/finance/expenses`;

  private _expenseAdd = new Subject<Expense>();
  get expenseAdd(): Observable<Expense> { return this._expenseAdd.asObservable() }

  private _expenseDelete = new Subject<Expense>();
  get expenseDelete(): Observable<Expense> { return this._expenseDelete.asObservable() }

  private _expenseUpdate = new Subject<Expense>();
  get expenseUpdate(): Observable<Expense> { return this._expenseUpdate.asObservable() }

  constructor(private _httpClient: HttpClient) {}

  async addAsync(space: Space, agency: Agency, customer: Customer, model: ExpenseAddModel): Promise<Expense> {
    const params = {
      customerId: customer.id,
      spaceId: space.id,
      agencyId: agency?.id
    };

    const call = this._httpClient.post<Expense>(`${this.url}`, model, {params});
    return new Expense(await firstValueFrom(call));
  }


  async listAsync(params: any = {}): Promise<ExpenseRangeViewModel> {
    const call = this._httpClient.get<any[]>(`${this.url}`, {params});
    let range = new ExpenseRangeViewModel(await firstValueFrom(call));
    range.hydrate()

    return range
  }


  async getAsync(id: number): Promise<Expense> {
    const call = this._httpClient.get<Expense>(`${this.url}/${id}`);
    return new Expense(await firstValueFrom(call));
  }

  async pdf(id: number): Promise<void> {
    const call = this._httpClient.get<Expense>(`${this.url}/${id}/pdf`);
    await firstValueFrom(call);
  }

  async deleteAsync(expense: Expense): Promise<void> {
    const call = this._httpClient.delete<void>(`${this.url}/${expense.id}`);
    return await firstValueFrom(call);
  }
}
