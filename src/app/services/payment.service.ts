import {Injectable} from "@angular/core";
import {SERVER_URL} from "../http";
import {Customer, Payment} from "../../entities";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {PaymentAddFormModel} from "../models/forms/payment.form-model";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private url = `${SERVER_URL}/payments`;
  constructor(private _httpClient: HttpClient) {}

  async addAsync(customer: Customer, model: PaymentAddFormModel): Promise<Payment> {
    const params = {customerId: customer.id }
    const call = this._httpClient.post<Payment>(`${this.url}`, model, {params});
    return new Payment(await firstValueFrom(call));
  }


  async listAsync(params: any = {}): Promise<Payment[]> {
    const call = this._httpClient.get<Payment[]>(`${this.url}`, {params});
    return (await firstValueFrom(call)).map(p => new Payment(p));
  }


  async getAsync(id: number): Promise<Payment> {
    const call = this._httpClient.get<Payment>(`${this.url}/${id}`);
    return new Payment(await firstValueFrom(call));
  }

  async pdf(id: number): Promise<void> {
    const call = this._httpClient.get<Payment>(`${this.url}/${id}/pdf`);
    await firstValueFrom(call);
  }

  async deleteAsync(payment: Payment): Promise<void> {
    const call = this._httpClient.delete<void>(`${this.url}/${payment.id}`);
    return await firstValueFrom(call);
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');
    }
  }
}
