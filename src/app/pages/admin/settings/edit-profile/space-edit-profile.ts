import {Component, Inject, OnInit} from "@angular/core";
import {ProcedureFormModel} from "@app/models";
import {MatDialog} from "@angular/material/dialog";
import {SpaceEditProfileLauncher} from "./space-edit-profile.launcher";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaneTicketService} from "@app/services";
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

@Component({
  templateUrl: 'space-edit-profile.html',
  selector: 'PlaneTicketExpenseAdd',
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
    IconButton
  ],
  providers: [ CustomerPickerDialog ]
})
export class SpaceEditProfile implements OnInit {
  icons = {ChevronDownIcon, XIcon}
  model = new ProcedureFormModel();
  remember: SpaceEditProfileLauncher;
  formGroup: FormGroup;

  customer: Customer;
  agency: Agency;

  constructor(public _dialogRef: DialogRef<PlaneTicket>,
              @Inject(DIALOG_DATA) private data: any,
              private _snackbar: MatSnackBar,
              private _customerPicker: CustomerPickerDialog,
              private _service: PlaneTicketService) {
    this.agency = data.agency;
    this.remember = new SpaceEditProfileLauncher();

    this.formGroup = new FormGroup({
      placeCount: new FormControl(this.remember.placeCount),
      price: new FormControl(this.remember.price),
      backAndForth: new FormControl(this.remember.backAndForth),
      travelClass: new FormControl(this.remember.travelClass),
      departureCountry: new FormControl(this.remember.departureCountry),
      departureCity: new FormControl(this.remember.departureCity),
      departureDate: new FormControl(this.remember.departureDate),
      arrivalCountry: new FormControl(this.remember.arrivalCountry),
      arrivalCity: new FormControl(this.remember.arrivalCity),
      returnDate: new FormControl(this.remember.returnDate),
    });

    this.formGroup.valueChanges.subscribe(value => {
      this.remember.value = value
    });
  }

  async ngOnInit() {


  }

  openCustomerPicker() {
    this._customerPicker.open(this.agency.spaceId).subscribe(customer => {
      if (customer) {
        this.customer = customer;
      }
    })
  }

  async addPlaneTicket() {
    const model = this.formGroup.value;
    const planeTicket = await this._service.addAsync(this.agency, this.customer, model);
    this.remember.clear()
    this._snackbar.open(`La commande de billet d'avion a été ajoutée.`, 'VOIR', {duration: 3000})
      .onAction().subscribe(() => {

    });
    this._dialogRef.close(planeTicket);
  }

}
