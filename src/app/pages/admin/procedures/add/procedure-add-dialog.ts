import {Injectable} from "@angular/core";
import {Space} from "@entities/space";
import {Dialog} from "@angular/cdk/dialog";
import {Procedure} from "@entities/procedure";
import {ProcedureAdd} from "@app/pages/admin/procedures/add/procedure-add";

@Injectable()
export class ProcedureAddDialog {
  constructor(private cdkDialog: Dialog) {
  }
  open(space: Space, onAdd: (procedure: Procedure) => void ) {
    const data = { space, onAdd };
    return this.cdkDialog.open<Procedure>(ProcedureAdd, {
      data,
      panelClass: 'my-dialog-panel',
      backdropClass: 'my-dialog-backdrop'
    })
  }
}
