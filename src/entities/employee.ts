import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";
import {PlaneTicket} from "./plane-ticket";
import {ProcedureApplyStep} from "./procedure-apply";
import {User} from "@app/identity";
import {Agency} from "@entities/agency";

export class Employee extends BaseEntity<number> {
  isAdmin: boolean

  agency:Agency;
  agencyId: number;

  user: User
  userId: string = '';

  personId: string;
  actorId: string;

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.isAdmin = value.isAdmin;
      this.personId = value.personId;
      this.actorId = value.actorId;

      this.agencyId = value.agencyId;
      this.agency = value.agency ? new Agency(value.agency) : undefined;

      this.userId = value.userId;
      this.user = value.user ? new User(value.user) : undefined;
    }
  }
}

