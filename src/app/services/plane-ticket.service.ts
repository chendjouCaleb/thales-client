import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Customer, Payment, PlaneTicket } from "../../entities";
import {SERVER_URL} from "../http/http-config";
import {firstValueFrom} from "rxjs";
import {PlaneTicketAddModel} from "../models";

@Injectable({
  providedIn: 'root'
})
export class PlaneTicketService {
  private url = `${SERVER_URL}/plane-tickets`;

  constructor(private _httpClient: HttpClient) {}

  async listByCustomerAsync(customer: Customer): Promise<PlaneTicket[]> {
    const customerId = customer.id.toString();
      const call = this._httpClient.get<PlaneTicket[]>(`${this.url}`, {params: {customerId}});
      const items = await firstValueFrom(call);
      return items.map(i => new PlaneTicket(i));
  }

  async listAllAsync(): Promise<PlaneTicket[]> {
    const call = this._httpClient.get<PlaneTicket[]>(`${this.url}`);
    const items = await firstValueFrom(call);
    return items.map(i => new PlaneTicket(i));
  }

  async listAsync(params: any): Promise<PlaneTicket[]> {
    const call = this._httpClient.get<PlaneTicket[]>(`${this.url}`, {params});
    const items = await firstValueFrom(call);
    return items.map(i => new PlaneTicket(i));
  }


  async getByIdAsync(id: number): Promise<PlaneTicket> {
    const call = this._httpClient.get<PlaneTicket>(`${this.url}/${id}`);
    const value = await firstValueFrom(call);
    return new PlaneTicket(value);
  }

  async addAsync(customer: Customer, model: PlaneTicketAddModel): Promise<PlaneTicket> {
    const params = {customerId: customer.id};
    const call = this._httpClient.post<any>(`${this.url}`, model, {params});
    const result =  await firstValueFrom(call);
    return new PlaneTicket(result);
  }

  async editAsync(planeTicket: PlaneTicket, model: PlaneTicketAddModel): Promise<PlaneTicket> {
    const call = this._httpClient.put<PlaneTicket>(`${this.url}/${planeTicket.id}`, model);
    const result =  await firstValueFrom(call);
    return new PlaneTicket(result);
  }

  async addPaymentAsync(planeTicket: PlaneTicket, amount: number): Promise<Payment> {
    const call = this._httpClient.post<Payment>(`${this.url}/${planeTicket.id}/payment`, {}, {params: {amount}});
    const payment = new Payment(await firstValueFrom(call));
    planeTicket.payments.unshift(payment);
    return payment;
  }

  deletePaymentAsync(planeTicket: PlaneTicket, payment: Payment): Promise<Payment> {
    const params = {paymentId: payment.id};

    const call = this._httpClient.put<Payment>(`${this.url}/${planeTicket.id}/payment`, {}, {params});
    return firstValueFrom(call);
  }

  async deleteAsync(planeTicket: PlaneTicket): Promise<void> {
    const call = this._httpClient.delete(`${this.url}/${planeTicket.id}`);
    await firstValueFrom(call);
  }
}
