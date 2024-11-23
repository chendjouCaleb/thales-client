import {SERVER_URL} from "@app/http";
import { HttpClient } from "@angular/common/http";
import {EventListModel} from "./event-list.model";
import {firstValueFrom} from "rxjs";
import {Event } from './models/event';
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Payment} from "@entities/payment";
import {Customer} from "@entities/customer";
import {Injectable} from "@angular/core";
import {User} from "@app/identity";
import {PlaneTicket} from "@entities/plane-ticket";
import {ProcedureApply, ProcedureApplyStep} from "@entities/procedure-apply";
import {Procedure, ProcedureStep} from "@entities/procedure";

@Injectable()
export class TraceService {
  private url = `${SERVER_URL}/events`;
  constructor(private _httpClient: HttpClient) {}


  async listAsync(params: any = {}): Promise<EventListModel> {
    const call = this._httpClient.get<EventListModel>(`${this.url}`, {params});
    const value = await firstValueFrom(call);

    const model = new EventListModel();
    model.total = value.total
    model.events = value.events.map(e => new Event(e));
    model.users = value.users.map(u => new User(u));
    model.agencies = value.agencies.map(a => new Agency(a));
    model.employees = value.employees.map(e => new Employee(e));
    model.procedures = value.procedures.map(e => new Procedure(e));
    model.procedureSteps = value.procedureSteps.map(e => new ProcedureStep(e));
    model.customers = value.customers.map(c => new Customer(c));
    model.payments = value.payments.map(p => new Payment(p));
    model.planeTickets = value.planeTickets.map(p => new PlaneTicket(p));

    model.procedureApplies = value.procedureApplies.map(p => new ProcedureApply(p));
    model.procedureApplySteps = value.procedureApplySteps.map(p => new ProcedureApplyStep(p));
    model.hydrate();

    return model;
  }
}
