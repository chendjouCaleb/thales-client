import {Injectable} from "@angular/core";
import {
  CustomerAddFormModel,
  CustomerChangeAddressFormModel,
  CustomerChangeContactFormModel,
  CustomerChangeCultureFormModel,
  CustomerChangeInfoFormModel,
  CustomerChangeJobFormModel,
  CustomerChangePassportFormModel,
  CustomerChangeStudyFormModel
} from "../models";
import {SERVER_URL} from "../http";
import {Customer} from "../../entities";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {DateTime} from "luxon";
import {CustomerRangeViewModel} from "@entities/view-models/CustomerRangeViewModel";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = `${SERVER_URL}/customers`;
  constructor(private _httpClient: HttpClient) {}

  async addAsync(model: CustomerAddFormModel): Promise<Customer> {
    const call = this._httpClient.post<Customer>(`${this.url}`, model);
    return new Customer(await firstValueFrom(call));
  }

  async changeInfoAsync(customer: Customer, model: CustomerChangeInfoFormModel): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${customer.id}/info`, model);
    await firstValueFrom(call);

   customer.firstName = model.firstName
   customer.lastName = model.lastName
   customer.birthDate = DateTime.fromFormat(model.birthDate, 'yyyy-LL-dd')
   customer.sex = model.sex
  }

  async changeCulture(customer: Customer, model: CustomerChangeCultureFormModel): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${customer.id}/culture`, model);
    await firstValueFrom(call);
    customer.languages = model.languages;
  }

  async changeJob(customer: Customer, model: CustomerChangeJobFormModel): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${customer.id}/job`, model);
    await firstValueFrom(call);
    customer.jobTitle = model.jobTitle;
  }

  async changePassport(customer: Customer, model: CustomerChangePassportFormModel): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${customer.id}/passport`, model);
    await firstValueFrom(call);
    Promise.resolve().then(() => {
      customer.hasPassport = model.hasPassport;
    })
  }

  async changeStudy(customer: Customer, model: CustomerChangeStudyFormModel): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${customer.id}/study`, model);
    await firstValueFrom(call);
    customer.studyLevel = model.studyLevel;
    customer.studyEndYear = model.studyEndYear;
  }

  async changeAddress(customer: Customer, model: CustomerChangeAddressFormModel): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${customer.id}/address`, model);
    await firstValueFrom(call);

    customer.country = model.country
    customer.region = model.region
    customer.city = model.city
    customer.district = model.district
    customer.address = model.address
  }

  async changeContact(customer: Customer, model: CustomerChangeContactFormModel): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${customer.id}/contact`, model);
    await firstValueFrom(call);
    customer.email = model.email;
    customer.phoneNumber = model.phoneNumber;

  }

  async listAsync(): Promise<Customer[]> {
    const call = this._httpClient.get<Customer[]>(`${this.url}`);
    const customers = await firstValueFrom(call);
    return customers.map(c => new Customer(c));
  }

  async getRangeAsync(params: any): Promise<CustomerRangeViewModel> {
    const call = this._httpClient.get<CustomerRangeViewModel>(`${this.url}`, {params});
    const customers = await firstValueFrom(call);
    return new CustomerRangeViewModel(customers);
  }

  async getAsync(id: number): Promise<Customer> {
    const call = this._httpClient.get<Customer>(`${this.url}/${id}`);
    return new Customer(await firstValueFrom(call));
  }
}
