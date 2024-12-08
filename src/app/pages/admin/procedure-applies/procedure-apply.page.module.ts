import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProcedureApplyPage} from "./procedure-apply.page";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {ProcedureAppliesListPage} from "./list/procedure-applies-list.page";
import {CustomerPickerModule, ProcedureApplyModule} from "@app/Components";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CleaveModule} from "@app/cleave";
import {ProcedureApplyList} from "@app/Components/procedure-apply/list/procedure-apply-list";

const routes: Routes = [
  {path: '', component: ProcedureAppliesListPage }
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatIconModule,
        ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatMenuModule,
        CustomerPickerModule, ProcedureApplyModule, MatProgressSpinnerModule, CleaveModule, ProcedureApplyList],
  exports: [
    ProcedureAppliesListPage
  ],
  declarations: [ProcedureApplyPage,  ProcedureAppliesListPage]
})
export class ProcedureApplyPageModule {

}
