import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {Procedure} from "@entities/procedure";
import {AdminPage} from "@app/pages/admin/admin.page";
import {NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'procedure-home.html',
  selector: 'ProcedureHome, [ProcedureHome]',
  imports: [
    RouterLink,
    NgForOf,
    MatIcon,
    Button
  ],
  standalone: true
})
export class ProcedureHome {
  @Input()
  procedure: Procedure;

  constructor(public parent: AdminPage) {}

}
