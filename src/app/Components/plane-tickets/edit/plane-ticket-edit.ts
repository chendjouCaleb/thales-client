import {Component, OnInit} from "@angular/core";
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
    MatButton
  ],
  standalone: true
})
export class PlaneTicketEdit implements OnInit {
  formGroup: FormGroup;
  planeTicket: PlaneTicket;

  breadcrumbItems: BreadcrumbItem[]

  constructor(private _dialog: MatDialog,
              private _snackbar: MatSnackBar,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _parent: AgencyPage,
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

    this.breadcrumbItems = [...this._parent.breadcrumbItems,
      new BreadcrumbItem('Billets d\'avion', `/agencies/${this.planeTicket.agencyId}/plane-tickets`),
      new BreadcrumbItem(`Billet N° ${this.planeTicket.id}`, `/agencies/${this.planeTicket.agencyId}/plane-tickets/${this.planeTicket.id}`),
      new BreadcrumbItem('Modifier')
    ]
   }


  async editPlaneTicket() {
    const model = this.formGroup.value;
    const planeTicket = await this._service.editAsync(this.planeTicket, model);

    this._snackbar.open(`La commande de billet d'avion a été modifiée.`, '', {duration: 5000});
    this._router.navigateByUrl(`/agencies/${planeTicket.agencyId}/plane-tickets/${planeTicket.id}`).then()
  }

}
