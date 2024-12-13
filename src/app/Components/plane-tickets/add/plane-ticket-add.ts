import {Component, OnInit} from "@angular/core";
import {ProcedureFormModel} from "@app/models";
import {MatDialog} from "@angular/material/dialog";
import {PlaneTicketAddRemember} from "./plane-ticket-add-remember";
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
import {Button} from "@app/ui";
import {ChevronDown, LucideAngularModule} from "lucide-angular";

@Component({
  templateUrl: 'plane-ticket-add.html',
  selector: 'PlaneTicketAdd',
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
    LucideAngularModule
  ]
})
export class PlaneTicketAdd implements OnInit {
  icons = { ChevronDown }
  model = new ProcedureFormModel();
  remember: PlaneTicketAddRemember;
  formGroup: FormGroup;

  customer: Customer;
  agency: Agency;

  constructor(private _dialog: MatDialog,
              private _snackbar: MatSnackBar,
              private _router: Router,
              private _parent: AgencyPage,
              private _route: ActivatedRoute,
              private _agencyHttpClient: AgencyHttpClient,
              private _customerPicker: CustomerPickerDialog,
              private _service: PlaneTicketService) {

    this.remember = new PlaneTicketAddRemember();

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
    this.agency = this._parent.agency;

  }

  openCustomerPicker() {
    this._customerPicker.open().subscribe(customer => {
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
    this._router.navigateByUrl(`/agencies/${this.agency.id}/plane-tickets/${planeTicket.id}`).then()
  }

}
