import {Component, Inject} from "@angular/core";
import {MatDialogClose} from "@angular/material/dialog";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NavHost, NavRouteDef} from "@app/navigation";
import {EmployeeAddUser} from "@app/Components/employees/add/employee-add-user";
import {EmployeeAddInfo} from "@app/Components/employees/add/employee-add-info";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {LucideAngularModule, XIcon} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {Member, MemberJobInfo} from "@entities/member";
import {SnackbarLoader} from "@app/Components";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MemberHttpClient} from "@app/services";
import {MemberAddUser} from "@app/Components/members/add/member-add-user";
import {MemberAddInfo} from "@app/Components/members/add/member-add-info";
import {MemberAddConfirm} from "@app/Components/members/add/member-add-confirm";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  templateUrl: 'member-change-job-info.html',
  selector: 'MemberChangeJobInfo',
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
    TextField,
    TextFieldInput,
    TextFieldLabel,
    Button,
    ReactiveFormsModule,
  ],
  standalone: true
})
export class MemberChangeJobInfo {
  icons = { XIcon }
  member: Member

  jobFormGroup = new FormGroup({
    jobTitle: new FormControl<string>(''),
    serviceName: new FormControl<string>(''),
    jobDescription: new FormControl<string>(''),
  });


  constructor(@Inject(DIALOG_DATA) data,
              private _loader: SnackbarLoader,
              private _snackbarBar: MatSnackBar,
              private _memberService: MemberHttpClient,
              public dialogRef: DialogRef<MemberJobInfo, MemberChangeJobInfo>) {
    this.member = data.member;
  }

  isLoading = false;


  async change() {

    const model = new MemberJobInfo(this.jobFormGroup.value)
    this.isLoading = true;
    const loaderRef = this._loader.open("Modification...");
    await this._memberService.changeJobInfoAsync(this.member, model)

    this._snackbarBar.open("Membre correctement modifié.", '', {duration: 5000});
    this.dialogRef.close();

    loaderRef.dismiss();
    this.isLoading = false;
  }
}
