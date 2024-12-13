import {Component, Inject, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaneTicketService} from "@app/services";
import {PlaneTicket} from "@entities/index";
import {BreadcrumbItem} from "@app/Components";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CleaveModule} from "@app/cleave";
import {MatButton} from "@angular/material/button";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button, IconButton} from "@app/ui";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {LucideAngularModule, XIcon} from "lucide-angular";
import {DateTime} from "luxon";
import {Money} from "@entities/money";

@Component({
  templateUrl: 'plane-ticket-edit.html',
  selector: 'PlaneTicketEdit',
  imports: [
    MatCheckbox,
    MatRadioButton,
    ReactiveFormsModule,
    MatRadioGroup,
    MatFormField,
    MatInput,
    MatLabel,
    CleaveModule,
    MatButton,
    Button,
    TextField,
    TextFieldInput,
    TextFieldLabel,
    IconButton,
    LucideAngularModule
  ],
  standalone: true
})
export class PlaneTicketEdit implements OnInit {
  icons = {XIcon}
  formGroup: FormGroup;
  planeTicket: PlaneTicket;

  constructor(public dialogRef: DialogRef<PlaneTicket>,
              @Inject(DIALOG_DATA) data: any,
              private _snackbar: MatSnackBar,
              private _service: PlaneTicketService) {
    this.planeTicket = data.planeTicket;
  }

  async ngOnInit() {

    this.formGroup = new FormGroup({
      placeCount: new FormControl(this.planeTicket.placeCount),
      price: new FormControl(this.planeTicket.price.amount),
      backAndForth: new FormControl(this.planeTicket.backAndForth),
      travelClass: new FormControl(this.planeTicket.travelClass),
      departureCountry: new FormControl(this.planeTicket.departureCountry),
      departureCity: new FormControl(this.planeTicket.departureCity),
      departureDate: new FormControl(this.planeTicket.departureDate.toJSDate()),
      arrivalCountry: new FormControl(this.planeTicket.arrivalCountry),
      arrivalCity: new FormControl(this.planeTicket.arrivalCity),
      returnDate: new FormControl(this.planeTicket.returnDate.toJSDate()),
    });
  }


  async editPlaneTicket() {
    const model = this.formGroup.value;
    await this._service.editAsync(this.planeTicket, model);

    this.planeTicket.placeCount = model.placeCount
    this.planeTicket.price = new Money(+model.price, 'XAF')
    this.planeTicket.backAndForth = model.backAndForth
    this.planeTicket.travelClass = model.travelClass
    this.planeTicket.departureCountry = model.departureCountry
    this.planeTicket.departureCity = model.departureCity
    this.planeTicket.departureDate = DateTime.fromJSDate(model.departureDate)
    this.planeTicket.arrivalCountry = model.arrivalCountry
    this.planeTicket.arrivalCity = model.arrivalCity
    this.planeTicket.returnDate = DateTime.fromJSDate(model.returnDate)

    this.dialogRef.close()
    this._snackbar.open(`La commande de billet d'avion a été modifiée.`, '', {duration: 5000});
  }

}
