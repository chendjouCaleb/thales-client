import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Customer} from "../../entities";
import {SERVER_URL} from "./http-config";
import {firstValueFrom} from "rxjs";
import {CustomerAddFormModel, CustomerChangeInfoFormModel} from "../models";

@Injectable({
  providedIn: 'root'
})
export class CustomerHttp {
  private url = `${SERVER_URL}/customers`;

  constructor(private _httpClient: HttpClient) {
  }

  listAsync(): Promise<Customer[]> {
      const call = this._httpClient.get<Customer[]>(`${this.url}`);
      return firstValueFrom(call)
  }

  getByIdAsync(id: number): Promise<Customer> {
    const call = this._httpClient.get<Customer>(`${this.url}/${id}`);
    return firstValueFrom(call)
  }

  addAsync(model: CustomerAddFormModel): Promise<Customer> {
    const call = this._httpClient.post<Customer>(`${this.url}`, model);
    return firstValueFrom(call)
  }

  changeInfoAsync(customer: Customer, model: CustomerChangeInfoFormModel): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${customer.id}`, model);
    return firstValueFrom(call)
  }


}
