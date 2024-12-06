import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ProceduresPage} from "./procedures.page";
import {ProceduresListPage} from "./list/procedures-list.page";
import {RouterModule, Routes} from "@angular/router";
import {ProcedureAddPage} from "./add/procedure-add.page";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ProcedureAddStep} from "./add/procedure-add-step";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {ProcedureAppliesPage} from "./applies/procedure-applies.page";
import {MatTabsModule} from "@angular/material/tabs";
import {ProcedureIndexPage} from "./index/procedure-index.page";
import {ProcedureHomePage} from "./home/procedure-home.page";
import {MatListModule} from "@angular/material/list";
import {CustomerPickerModule, ProcedureApplyModule} from "../../../Components";
import {ProcedureSettingsPage} from "./settings/procedure-settings.page";
import {ProcedureChangeName} from "./change-name/procedure-change-name";
import {ProcedureDelete} from "./delete/procedure-delete";
import {ProcedureChangeDescription} from "./change-description/procedure-change-description";
import {ProcedureStepChangeName} from "./step-change-name/procedure-step-change-name";
import {ProcedureStepChangePrice} from "./step-change-price/procedure-step-change-price";
import {ProcedureStepChangeDescription} from "./step-change-description/procedure-step-change-description";
import {ProcedureStepSettingsPage} from "./step-settings/procedure-step-settings.page";
import {CleaveModule} from "@app/cleave";
import {TraceModule} from "@app/trace";
import {Button} from "@app/ui";

const routes: Routes = [
  {path: 'list', component: ProceduresListPage},
  {path: 'add', component: ProcedureAddPage},
  {path: ':procedureId', component: ProcedureIndexPage},
  {path: ':procedureId/settings', component: ProcedureSettingsPage},
  {path: 'steps/:procedureStepId/settings', component: ProcedureStepSettingsPage},
  {path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
    imports: [CommonModule, MatButtonModule, MatIconModule, ReactiveFormsModule,
        RouterModule.forChild(routes), MatFormFieldModule, MatInputModule, MatDialogModule, MatTabsModule, MatListModule,
        CustomerPickerModule, ProcedureApplyModule, CleaveModule, TraceModule, Button],
  declarations: [ProceduresPage, ProceduresListPage, ProcedureAddPage, ProcedureAddStep,
    ProcedureIndexPage, ProcedureAppliesPage, ProcedureHomePage, ProcedureSettingsPage, ProcedureChangeName,
    ProcedureDelete, ProcedureChangeDescription, ProcedureStepSettingsPage,
  ProcedureStepChangeName, ProcedureStepChangePrice, ProcedureStepChangeDescription ]
})
export class ProceduresPageModule {

}
