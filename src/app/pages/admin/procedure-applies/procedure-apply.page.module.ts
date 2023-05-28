import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProcedureApplyHomePage} from "./home/procedure-apply-home.page";
import {ProcedureApplyPage} from "./procedure-apply.page";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {path: ':procedureApplyId', component: ProcedureApplyHomePage }
]

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes)],
  declarations: [ ProcedureApplyPage, ProcedureApplyHomePage ]
})
export class ProcedureApplyPageModule {

}
