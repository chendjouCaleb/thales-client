import {Payment} from "@entities/payment";
import {Event} from './models';
import {User} from "@app/identity";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Customer} from "@entities/customer";

export class EventListModel {
  events: Event[];
  users: User[];
  agencies: Agency[];
  employees: Employee[];
  customers: Customer[];
  payments: Payment[];
}
