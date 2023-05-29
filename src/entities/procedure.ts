import {BaseEntity} from "./base-entity";

export class Procedure extends BaseEntity<number>  {
  name: string = '';
  normalizedName: string = '';
  price: number = 0;
  description: string = '';

  steps: ProcedureStep[]=[];


  constructor(value: any = {}) {
    super(value);
    if(value) {
      this.name = value.name;
      this.normalizedName = value.normalizedName;
      this.price = value.price;
      this.description = value.description;
    }
  }
}


export class ProcedureStep extends BaseEntity<number>{
  name: string = '';
  normalizedName: string = '';
  description: string = '';

  price: number = 0;
  index: number = 0;

  procedure: Procedure;
  procedureId: number;

  constructor(value: any = {}) {
    super(value);
    if(value) {
      this.name = value.name;
      this.normalizedName = value.normalizedName;
      this.price = value.price;
      this.description = value.description;

      this.index = value.index;
      this.procedureId = value.procedureId;

      if(value.procedure) {
        this.procedure = new Procedure(value.procedure);
      }
    }
  }
}
