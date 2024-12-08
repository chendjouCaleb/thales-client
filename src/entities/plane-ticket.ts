import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";
import {DateTime} from "luxon";
import {Payment} from "./payment";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Money} from "@entities/money";
import {Space} from "@entities/space";

export class PlaneTicket extends BaseEntity<number> {
  placeCount: number = 0;
  backAndForth: boolean;
  travelClass: string = '';

  departureCountry: string = '';
  departureCity: string = '';
  departureDate: DateTime;

  arrivalCountry: string = '';
  arrivalCity: string = '';
  returnDate: DateTime;

  customer: Customer;
  customerId: number;

  agency: Agency;
  agencyId: number;

  space: Space;
  spaceId: number;

  employee: Employee;
  employeeId: number;

  payments: Payment[] = [];
  paymentAmount: number;

  price: Money;


  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.placeCount = value.placeCount;
      this.backAndForth = value.backAndForth;
      this.travelClass = value.travelClass;

      this.price = Money.parse(value.price);

      this.departureCountry = value.departureCountry;
      this.departureCity = value.departureCity;
      this.departureDate = value.departureDate ? DateTime.fromISO(value.departureDate) : null;

      this.arrivalCountry = value.arrivalCountry;
      this.arrivalCity = value.arrivalCity;
      this.returnDate = value.returnDate ? DateTime.fromISO(value.returnDate) : null;

      this.customerId = value.customerId;
      this.customer = value.customer ? new Customer(value.customer) : null;
      this.payments = value.payments ? value.payments.map(p => new Payment(p)) : null;
      this.paymentAmount = value.paymentAmount;

      this.spaceId = value.spaceId;
      this.space = value.space ? new Space(value.space) : undefined;

      this.agencyId = value.agencyId;
      this.agency = value.agency ? new Agency(value.agency) : undefined;

      this.employeeId = value.employeeId;
      this.employee = value.employee ? new Employee(value.employee) : undefined;
    }
  }
}

