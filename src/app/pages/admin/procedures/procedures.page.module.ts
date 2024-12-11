import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ProceduresPage} from "./procedures.page";
import {ProceduresListPage} from "./list/procedures-list.page";
import {RouterModule, Routes} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";
import {ProcedureIndexPage} from "./index/procedure-index.page";
import {MatListModule} from "@angular/material/list";
import {CustomerPickerModule, ProcedureApplyModule} from "@app/Components";
import {ProcedureSettingsPage} from "./settings/procedure-settings.page";
import {ProcedureStepChangePrice} from "./step-change-price/procedure-step-change-price";
import {ProcedureStepChangeDescription} from "./step-change-description/procedure-step-change-description";
import {ProcedureStepSettingsPage} from "./step-settings/procedure-step-settings.page";
import {CleaveModule} from "@app/cleave";
import {TraceModule} from "@app/trace";
import {ProcedureApplyList} from "@app/Components/procedure-apply/list/procedure-apply-list";
import {Button} from "@app/ui";
import {HorizontalPager, TabRow, TabRowItem} from "@app/NeoUI";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {ProcedureApplyHome} from "@app/Components/procedure-apply/details/home/procedure-apply-home";

const routes: Routes = [
  {path: 'list', component: ProceduresListPage},
  {path: ':procedureId', component: ProcedureIndexPage},
  {path: ':procedureId/settings', component: ProcedureSettingsPage},
  {path: 'steps/:procedureStepId/settings', component: ProcedureStepSettingsPage},
  {path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, ReactiveFormsModule,
    RouterModule.forChild(routes), MatFormFieldModule, MatInputModule, MatDialogModule, MatTabsModule, MatListModule,
    CustomerPickerModule, ProcedureApplyModule, CleaveModule, TraceModule, ProcedureApplyList, Button,
    HorizontalPager, PaymentsList, ProcedureApplyHome, TabRow, TabRowItem],

  declarations: [ProceduresPage, ProcedureStepChangeDescription]
})
export class ProceduresPageModule {

}
