import {BaseEntity} from "./base-entity";

export class Procedure extends BaseEntity<number>  {
  name: string = '';
  normalizedName: string = '';

  steps: ProcedureStep[]=[];
  price: number = 0;
  description: string = '';
}


export class ProcedureStep extends BaseEntity<number>{
  name: string = '';
  normalizedName: string = '';
  description: string = '';

  price: number = 0;
  index: number = 0;

  procedure: Procedure;
  procedureId: number;
}
