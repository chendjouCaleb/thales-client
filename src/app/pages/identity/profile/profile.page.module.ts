import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfileHomePage} from "./home/profile-home.page";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  { path: '', component: ProfileHomePage }
]

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes)],
  declarations: [ ProfileHomePage ]
})
export class ProfilePageModule {

}
