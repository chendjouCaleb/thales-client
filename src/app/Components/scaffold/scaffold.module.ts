import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Scaffold} from "./scaffold";
import {ScaffoldToolbar} from "./toolbar/scaffold-toolbar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {Button} from "@app/ui";

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatButtonModule, RouterModule, MatMenuModule, Button, ScaffoldToolbar],
  declarations: [ Scaffold ],
  exports: [ Scaffold ]
})
export class ScaffoldModule {

}
