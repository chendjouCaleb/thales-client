import {BaseEntity} from "./base-entity";

export class Procedure extends BaseEntity<number>  {
  name: string = '';
  normalizedName: string = '';

  steps: ProcedureStep[]=[];
  price: number = 0;
}


export class ProcedureStep extends BaseEntity<number>{
  name: string = '';
  normalizedName: string = '';

  price: number = 0;
  index: number = 0;

  procedure: Procedure;
  procedureId: number;
}
