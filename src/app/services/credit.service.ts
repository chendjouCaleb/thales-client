import {Injectable} from "@angular/core";
import {SERVER_URL} from "../http";
import {Agency, Customer, Credit, Space} from "../../entities";
import { HttpClient } from "@angular/common/http";
import {firstValueFrom, Observable, Subject} from "rxjs";
import {CreditAddModel} from "@app/models";
import {CreditRangeViewModel} from "@entities/view-models/CreditRangeViewModel";
import {Money} from "@entities/money";

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private url = `${SERVER_URL}/finance/credits`;

  private _creditAdd = new Subject<Credit>();
  get creditAdd(): Observable<Credit> { return this._creditAdd.asObservable() }

  private _creditDelete = new Subject<Credit>();
  get creditDelete(): Observable<Credit> { return this._creditDelete.asObservable() }

  private _creditUpdate = new Subject<Credit>();
  get creditUpdate(): Observable<Credit> { return this._creditUpdate.asObservable() }

  constructor(private _httpClient: HttpClient) {}

  async addAsync(space: Space, agency: Agency, customer: Customer, model: CreditAddModel): Promise<Credit> {
    const params = {
      customerId: customer.id,
      spaceId: space.id,
      agencyId: agency?.id
    };

    const call = this._httpClient.post<Credit>(`${this.url}`, model, {params});
    let credit = new Credit(await firstValueFrom(call));
    credit = await this.getAsync(credit.id)

    this._creditAdd.next(credit);
    return credit;
  }


  async listAsync(params: any = {}): Promise<CreditRangeViewModel> {
    const call = this._httpClient.get<any[]>(`${this.url}`, {params});
    let range = new CreditRangeViewModel(await firstValueFrom(call));
    range.hydrate()

    return range
  }


  async getAsync(id: string): Promise<Credit> {
    const call = this._httpClient.get<Credit>(`${this.url}/${id}`);
    return new Credit(await firstValueFrom(call));
  }

  async pdf(id: number): Promise<void> {
    const call = this._httpClient.get<Credit>(`${this.url}/${id}/pdf`);
    await firstValueFrom(call);
  }

  async deleteAsync(credit: Credit): Promise<void> {
    const call = this._httpClient.delete<void>(`${this.url}/${credit.id}`);
    await firstValueFrom(call);
    this._creditDelete.next(credit);
  }


  async changeAmountAsync(credit: Credit, amount: Money): Promise<void> {
    const params = { amount: amount.toString() }
    const call = this._httpClient.put<void>(`${this.url}/${credit.id}/amount`, {}, {params});
    await firstValueFrom(call);
    credit.amount = amount;
    this._creditUpdate.next(credit);
  }

  async changeDetailsAsync(credit: Credit, details: string): Promise<void> {
    const params = { details }
    const call = this._httpClient.put<void>(`${this.url}/${credit.id}/details`, {}, {params});
    await firstValueFrom(call);
    credit.details = details;
    this._creditUpdate.next(credit);
  }

  async changeReasonAsync(credit: Credit, reason: string): Promise<void> {
    const params = { reason }
    const call = this._httpClient.put<void>(`${this.url}/${credit.id}/reason`, {}, {params});
    await firstValueFrom(call);
    credit.reason = reason;
    this._creditUpdate.next(credit);
  }
}
