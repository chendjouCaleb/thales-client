import {ProcedureApplyStep} from "@entities/procedure-apply";

export class ProcedureApplyStepViewModel {
  procedureName: string;
  procedureStepName: string;
  procedureStepId: number;
  procedureApplyId: number;

  constructor(value: any = {}) {
    this.procedureName = value.procedureName;
    this.procedureStepName = value.procedureStepName;
    this.procedureStepId = value.procedureStepId;
    this.procedureApplyId = value.procedureApplyId;
  }

  static fromApply(apply: ProcedureApplyStep): ProcedureApplyStepViewModel {
    const viewModel = new ProcedureApplyStepViewModel(apply);
    viewModel.procedureName = apply.procedureStep?.procedure?.name;
    viewModel.procedureStepName = apply.procedureStep?.name;

    return viewModel;
  }
}
