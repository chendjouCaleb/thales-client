import {Component, OnInit} from "@angular/core";
import {ProcedureFormModel} from "../../../../models";
import {MatDialog} from "@angular/material/dialog";
import {PlaneTicketAddRemember} from "./plane-ticket-add-remember";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {PlaneTicketService} from "../../../../services";
import {CustomerPickerDialog} from "../../../../Components";
import {Customer} from "../../../../../entities";

@Component({
  templateUrl: 'plane-ticket-add.page.html'
})
export class PlaneTicketAddPage implements OnInit {
  model = new ProcedureFormModel();
  remember: PlaneTicketAddRemember;
  formGroup: FormGroup;

  customer: Customer;

  constructor(private _dialog: MatDialog,
              private _snackbar: MatSnackBar,
              private _router: Router,
              private _customerPicker: CustomerPickerDialog,
              private _service: PlaneTicketService) {

    this.remember = new PlaneTicketAddRemember();

    this.formGroup = new FormGroup({
      placeCount : new FormControl(this.remember.placeCount),
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

  ngOnInit() {
    this._customerPicker.open().subscribe(customer => {
      if(customer) {
        this.customer = customer;
      }
    })
  }


  async addPlaneTicket() {
    const model = this.formGroup.value;
   const planeTicket = await this._service.addAsync(this.customer, model);

    this._snackbar.open(`La commande de billet d'avion a été ajoutée.`, 'VOIR', {})
        .onAction().subscribe(() => {
          this._router.navigateByUrl(`/admin/plane-tickets/${planeTicket.id}`).then()
      });
  }

}
