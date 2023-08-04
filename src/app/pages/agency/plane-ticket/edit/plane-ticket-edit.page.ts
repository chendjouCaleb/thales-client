import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaneTicketService} from "../../../../services";
import {PlaneTicket} from "@entities/index";

@Component({
  templateUrl: 'plane-ticket-edit.page.html'
})
export class PlaneTicketEditPage implements OnInit {
  formGroup: FormGroup;
  planeTicket: PlaneTicket;

  constructor(private _dialog: MatDialog,
              private _snackbar: MatSnackBar,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _service: PlaneTicketService) {
  }

  async ngOnInit() {
    const planeTicketId = +this._activatedRoute.snapshot.params['planeTicketId'];

    this.planeTicket = await this._service.getByIdAsync(planeTicketId);
    this.formGroup = new FormGroup({
      placeCount : new FormControl(this.planeTicket.placeCount),
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
    const planeTicket = await this._service.editAsync(this.planeTicket, model);

    this._snackbar.open(`La commande de billet d'avion a été modifiée.`, '', {duration: 5000});
    this._router.navigateByUrl(`/agencies/${planeTicket.agencyId}/plane-tickets/${planeTicket.id}`).then()
  }

}
