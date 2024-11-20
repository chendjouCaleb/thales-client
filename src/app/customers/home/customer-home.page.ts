import {Component, OnInit} from "@angular/core";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Button, IconButton} from "@app/ui";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CustomerService} from "@app/services";
import {Customer} from "@entities/customer";
import {LucideAngularModule, StarIcon, ArrowLeftIcon, Trash2Icon, ArchiveIcon, ArchiveXIcon} from 'lucide-angular';
import {Location, NgIf} from '@angular/common';
import {MatTooltip} from "@angular/material/tooltip";
import {CustomerPersonaInput} from "@app/customers/persona/customer-persona-input";
import {CustomerArchiveDialogLauncher} from "@app/customers/archive";
import {CustomerDeleteDialogLauncher} from "@app/customers/delete";
@Component({
  standalone: true,
  imports: [
    CustomerForm,
    Button,
    LucideAngularModule,
    IconButton,
    MatTooltip,
    NgIf,
    CustomerPersonaInput,
    RouterLink
  ],
  providers: [ CustomerArchiveDialogLauncher, CustomerDeleteDialogLauncher ],
  templateUrl: 'customer-home.page.html'
})
export class CustomerHomePage implements OnInit {
  icons = { StarIcon, ArrowLeftIcon, Trash2Icon, ArchiveIcon, ArchiveXIcon }
  customer: Customer;
  constructor(private _route: ActivatedRoute,
              public router: Router,
              public location: Location,

              private _archiveDialog: CustomerArchiveDialogLauncher,
              private _deleteDialogLauncher: CustomerDeleteDialogLauncher,
              private _customerService: CustomerService) {
  }

  async ngOnInit() {
    const id = this._route.snapshot.params['customerId'];
    this.customer = await this._customerService.getAsync(id);
  }


  async toggleFavorite(customer: Customer) {
    await this._customerService.toggleFavoriteAsync(customer);
    customer.isFavorite = !customer.isFavorite;
    //this.onFavoriteChange.emit(customer);
  }

  toggleArchived(customer: Customer) {

  }

  archive(customer: Customer) {
    const dialogRef = this._archiveDialog.launch(customer);
    dialogRef.subscribe((result => {
      customer.isArchived = true
      //this.onArchivedChange.emit(customer)
    }))
  }

  restoreArchived(customer: Customer) {
    const dialogRef = this._archiveDialog.launchRestore(customer);
    dialogRef.subscribe((result => {
      customer.isArchived = false
      //this.onArchivedChange.emit(customer)
    }))
  }

  delete(customer: Customer) {
    const dialogRef = this._deleteDialogLauncher.launch(customer);
    dialogRef.subscribe((deleted => {
      if(deleted) {
        this.location.back();
      }
    }))
  }
}
