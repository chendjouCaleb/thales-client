import {BaseEntity} from "../base-entity";
import {Customer} from "../customer";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Money} from "@entities/money";
import {Member} from "@entities/member";
import {User} from "@app/identity";
import {Space} from "@entities/space";
import {DateTime} from "luxon";

export class Credit extends BaseEntity<string> {
  amount: Money;
  reason: string = '';
  details: string = '';
  updatedAt: DateTime;

  customer: Customer;
  customerId: number;


  agency:Agency;
  agencyId: number;

  space: Space
  spaceId: number

  employee: Employee;
  employeeId: number;

  member: Member
  memberId: number;

  user: User
  userId: string;

  creditOwners: CreditOwner[]
  creditElements: CreditElement[]
  creditPersons: CreditPerson[]

  constructor(value: any = {}) {
    super(value);
    if (value) {

      this.updatedAt = value.updatedAt ? DateTime.fromISO(value.updatedAt) : null;
      this.amount = Money.parse(value.amount);

      this.reason = value.reason;
      this.details = value.details;

      this.customerId = value.customerId;

      this.customer = value.customer ? new Customer(value.customer) : null;

      this.agencyId = value.agencyId;
      this.agency = value.agency ? new Agency(value.agency) : undefined;

      this.employeeId = value.employeeId;
      this.employee = value.employee ? new Employee(value.employee) : undefined;

      this.userId = value.userId;
      this.user = value.user ? new User(value.user) : undefined;

      //this.memberId = value.memberId;
      this.member = value.member ? new Member(value.member) : undefined;
      this.employee = value.employee ? new Employee(value.employee) : undefined;
      if(this.user) {
        this.member.user = this.user;
      }
      if(this.employee && this.user) {
        this.employee.user = this.user;
      }


      console.log('Persons: ', value.creditPersons)
      this.creditOwners = value.creditOwners?.map(eo => new CreditOwner(eo));
      this.creditElements = value.creditElements?.map(eo => new CreditElement(eo));
      this.creditPersons = value.creditPersons?.map(eo => new CreditPerson(eo));
    }
  }
}

export class CreditOwner {
  id: string;
  createdAt: Date;
  ownerId: string;

  creditId: string;

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.ownerId = value.ownerId;
      this.creditId = value.creditId;
    }
  }
}


export class CreditElement {
  id: string;
  createdAt: Date;
  elementId: string;

  creditId: string;

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.elementId = value.elementId;
      this.creditId = value.creditId;
    }
  }
}


export class CreditPerson {
  id: string;
  createdAt: Date;
  personId: string;

  creditId: string;

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.personId = value.personId;
      this.creditId = value.creditId;
    }
  }
}
