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
import {Customer, CustomerInfoModel, CustomerStatisticsModel, Space} from "../../entities";
import { HttpClient } from "@angular/common/http";
import {firstValueFrom, Observable, Subject} from "rxjs";
import {DateTime} from "luxon";
import {CustomerRangeViewModel} from "@entities/view-models/CustomerRangeViewModel";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = `${SERVER_URL}/customers`;

  private _customerArchiveAdd = new Subject<Customer>();
  get customerArchiveAdd(): Observable<Customer> {
    return this._customerArchiveAdd.asObservable()
  }

  private _customerArchiveRemove = new Subject<Customer>();
  get customerArchiveRemove(): Observable<Customer> {
    return this._customerArchiveRemove.asObservable()
  }

  private _customerFavoriteAdd = new Subject<Customer>();
  get customerFavoriteAdd(): Observable<Customer> {
    return this._customerFavoriteAdd.asObservable()
  }

  private _customerFavoriteRemove = new Subject<Customer>();
  get customerFavoriteRemove(): Observable<Customer> {
    return this._customerFavoriteRemove.asObservable()
  }


  constructor(private _httpClient: HttpClient) {}

  async addAsync(space: Space, model: CustomerInfoModel): Promise<Customer> {
    const params = {spaceId: space.id}
    const call = this._httpClient.post<Customer>(`${this.url}`, model, {params});
    return new Customer(await firstValueFrom(call));
  }

  async updateAsync(customer: Customer, model: CustomerInfoModel): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${customer.id}`, model);
    await firstValueFrom(call);
  }

  async deleteAsync(customer: Customer): Promise<void> {
    const call = this._httpClient.delete<void>(`${this.url}/${customer.id}`, {});
    await firstValueFrom(call);
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

  async toggleFavoriteAsync(customer: Customer): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${customer.id}/favorite`, {});
    await firstValueFrom(call);

    if(customer.isFavorite) {
      this._customerFavoriteRemove.next(customer);
    }else{
      this._customerFavoriteAdd.next(customer);
    }
  }

  async toggleArchivedAsync(customer: Customer): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${customer.id}/archived`, {});
    await firstValueFrom(call);

    if(customer.isArchived) {
      this._customerArchiveRemove.next(customer);
    }else{
      this._customerArchiveAdd.next(customer);
    }
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

  async getStatisticsAsync(space: Space): Promise<CustomerStatisticsModel> {
    const params = {spaceId: space.id}
    const call = this._httpClient.get<Customer>(`${this.url}/statistics`, {params});
    return new CustomerStatisticsModel(await firstValueFrom(call));
  }
}
