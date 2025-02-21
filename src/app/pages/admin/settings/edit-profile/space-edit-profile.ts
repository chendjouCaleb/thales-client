import {Component, Inject, OnInit} from "@angular/core";
import {ProcedureFormModel} from "@app/models";
import {MatDialog} from "@angular/material/dialog";
import {SpaceEditProfileLauncher} from "./space-edit-profile.launcher";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaneTicketService, SpaceHttpClient} from "@app/services";
import {CustomerPickerDialog} from "@app/Components";
import {Customer} from "@entities/customer";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {Agency} from "@entities/agency";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {CleaveModule} from "@app/cleave";
import {Button, IconButton} from "@app/ui";
import {ChevronDown, ChevronDownIcon, LucideAngularModule, XIcon} from "lucide-angular";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {PlaneTicket} from "@entities/plane-ticket";
import {Space} from "@entities/space";
import {SpaceProfileFormGroup} from "@app/pages/admin/settings/edit-profile/space-profile-form-group";
import {SpaceEditProfileFormAddress} from "@app/pages/admin/settings/edit-profile/space-edit-profile-form-address";
import {SpaceEditProfileFormPhone} from "@app/pages/admin/settings/edit-profile/space-edit-profile-form-phone";
import {SpaceEditProfileFormEmail} from "@app/pages/admin/settings/edit-profile/space-edit-profile-form-email";

@Component({
  templateUrl: 'space-edit-profile.html',
  selector: 'SpaceEditProfile',
  standalone: true,
  imports: [
    TextField,
    ReactiveFormsModule,
    NgIf,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    TextFieldInput,
    TextFieldLabel,
    CleaveModule,
    Button,
    LucideAngularModule,
    IconButton,
    SpaceEditProfileFormAddress,
    SpaceEditProfileFormPhone,
    SpaceEditProfileFormEmail
  ]
})
export class SpaceEditProfile implements OnInit {
  icons = {ChevronDownIcon, XIcon}
  model = new ProcedureFormModel();
  formGroup: SpaceProfileFormGroup;

  space: Space;

  constructor(public _dialogRef: DialogRef<PlaneTicket>,
              @Inject(DIALOG_DATA) private data: any,
              private _snackbar: MatSnackBar,
              private _service: SpaceHttpClient ) {
    this.space = data.space;

    this.formGroup = new SpaceProfileFormGroup(this.space)

  }

  async ngOnInit() {


  }

  async editProfile() {
    const model = this.formGroup.getModel();
    const planeTicket = await this._service.editProfileAsync(this.space, model)

    this._snackbar.open(`Le profil de l'espace a été modifié`, '', {duration: 3000});
    this._dialogRef.close();
  }

}
