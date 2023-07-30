import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "@app/http";
import {Employee} from "@entities/employee";
import {firstValueFrom} from "rxjs";
import {EmployeeAddModel} from "@app/models";
import {Agency} from "@entities/agency";

@Injectable({
  providedIn: 'root'
})
export class EmployeeHttpClient {
  private url = `${SERVER_URL}/employees`;

  constructor(private _httpClient: HttpClient) {}

  async listAsync(params: any = {}): Promise<Employee[]> {
    const call = this._httpClient.get<Employee[]>(`${this.url}`, {params});
    const items = await firstValueFrom(call);
    return items.map(i => new Employee(i));
  }

  async getByIdAsync(id: number): Promise<Employee> {
    const call = this._httpClient.get<Employee>(`${this.url}/${id}`);
    const value = await firstValueFrom(call);
    return new Employee(value);
  }

  containsNameAsync(name: string): Promise<boolean> {
    const call = this._httpClient.get<boolean>(`${this.url}/contains/name`, {params: {name}});
    return firstValueFrom(call);
  }

  async addAsync(agency:Agency, model: EmployeeAddModel): Promise<Employee> {
    const params = { agencyId: agency.id };
    const call = this._httpClient.post<Employee>(`${this.url}`, model, {params});
    const value = await firstValueFrom(call);
    return new Employee(value);
  }

  changeNameAsync(employee: Employee, name: string): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${employee.id}/name`, {name});
    return firstValueFrom(call);
  }


  async deleteAsync(employee: Employee): Promise<void> {
    const call = this._httpClient.delete(`${this.url}/${employee.id}`);
    await firstValueFrom(call);
  }

  async setAdminAsync(employee: Employee): Promise<void> {
    const call = this._httpClient.put(`${this.url}/${employee.id}/set-admin`, {});
    await firstValueFrom(call);
  }

  async unSetAdminAsync(employee: Employee): Promise<void> {
    const call = this._httpClient.put(`${this.url}/${employee.id}/set-admin`, {});
    await firstValueFrom(call);
  }
}
