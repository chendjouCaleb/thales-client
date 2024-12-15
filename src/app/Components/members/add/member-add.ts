import {Component, Inject} from "@angular/core";
import {MatDialogClose} from "@angular/material/dialog";
import {User} from "@app/identity";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NavHost, NavRouteDef} from "@app/navigation";
import {EmployeeAddUser} from "@app/Components/employees/add/employee-add-user";
import {EmployeeAddInfo} from "@app/Components/employees/add/employee-add-info";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {LucideAngularModule, XIcon} from "lucide-angular";
import {IconButton} from "@app/ui";
import {Member} from "@entities/member";
import {Space} from "@entities/space";
import {MemberAddModel} from "@app/models";
import {SnackbarLoader} from "@app/Components";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MemberHttpClient} from "@app/services";
import {MemberAddUser} from "@app/Components/members/add/member-add-user";
import {MemberAddInfo} from "@app/Components/members/add/member-add-info";
import {MemberAddConfirm} from "@app/Components/members/add/member-add-confirm";

@Component({
  templateUrl: 'member-add.html',
  selector: 'SpaceAdd',
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIcon,
    NavHost,
    EmployeeAddUser,
    EmployeeAddInfo,
    NavRouteDef,
    IconButton,
    LucideAngularModule,
    MemberAddUser,
    MemberAddInfo,
    MemberAddConfirm,
  ],
  standalone: true
})
export class MemberAdd {
  icons = { XIcon }
  space: Space;
  user: User;

  model = new MemberAddModel();


  constructor(@Inject(DIALOG_DATA) data,
              private _loader: SnackbarLoader,
              private _snackbarBar: MatSnackBar,
              private _memberService: MemberHttpClient,
              public dialogRef: DialogRef<Member, MemberAdd>) {
    this.space = data.space;
  }

  isLoading = false;
  async add() {

    this.isLoading = true;
    const loaderRef = this._loader.open("Ajout du membre...");
    const employee = await this._memberService.addAsync(this.space, this.model);

    if(employee) {
      this._snackbarBar.open("Membre correctement ajouté.", '', {duration: 5000});
      this.dialogRef.close(employee);
    }

    loaderRef.dismiss();
    this.isLoading = false;
  }
}
