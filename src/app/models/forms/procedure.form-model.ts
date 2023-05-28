export class ProcedureFormModel {
  name: string = '';
  description: string = '';
  stepModels: ProcedureStepFormModel[] = [];
}


export class ProcedureStepFormModel {
  name: string = '';
  description: string = '';
  price: number = 0;
  index: number = 0;
}


export class ProcedureApplyStepValidateModel {
  paymentAmount: number = 0;
}
