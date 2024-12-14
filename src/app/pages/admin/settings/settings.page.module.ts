import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SettingsHomePage} from "./home/settings-home.page";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {AgencyModule} from "@app/Components/agencies";

const routes: Routes = [
  { path: '', component: SettingsHomePage },
]

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), MatMenuModule, MatButtonModule, MatTableModule,
    MatDialogModule, MatIconModule, AgencyModule ],
  declarations: [  ]
})
export class SettingsPageModule {

}
