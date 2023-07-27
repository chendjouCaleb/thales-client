import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";
import {PlaneTicket} from "./plane-ticket";
import {ProcedureApplyStep} from "./procedure-apply";

export class Agency extends BaseEntity<number> {
  name: string = '';
  normalizedName: string = '';

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.normalizedName = value.normalizedName;
      this.name = value.name;
    }
  }
}

