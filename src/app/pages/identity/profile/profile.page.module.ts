import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfileHomePage} from "./home/profile-home.page";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ScaffoldModule} from "@app/Components";
import {ProfileChangeName} from "./user-change-name/profile-change-name";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";

const routes: Routes = [
  { path: '', component: ProfileHomePage }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, ScaffoldModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule],
  declarations: [ ProfileHomePage, ProfileChangeName ]
})
export class ProfilePageModule {

}
