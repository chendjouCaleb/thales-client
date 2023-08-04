import {Component, OnInit} from "@angular/core";
import {ProcedureFormModel} from "@app/models";
import {MatDialog} from "@angular/material/dialog";
import {PlaneTicketAddRemember} from "./plane-ticket-add-remember";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaneTicketService} from "@app/services";
import {CustomerPickerDialog} from "@app/Components";
import {Customer} from "@entities/customer";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {Agency} from "@entities/agency";
import {AgencyPage} from "@app/pages/agency/agency.page";

@Component({
  templateUrl: 'plane-ticket-add.page.html'
})
export class PlaneTicketAddPage implements OnInit {
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
    this._snackbar.open(`La commande de billet d'avion a été ajoutée.`, 'VOIR', {})
      .onAction().subscribe(() => {

    });
    this._router.navigateByUrl(`/agencies/${this.agency.id}/plane-tickets/${planeTicket.id}`).then()
  }

}
