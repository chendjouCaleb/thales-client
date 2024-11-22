import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {CustomerService} from "../../services";
import {Customer} from "../../../entities";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  templateUrl: 'customer-picker.html',
  styleUrl: 'customer-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerPicker implements OnInit {
  customers: Customer[] = [];
  isLoaded: boolean = false;

  displayedCustomers: Customer[] = [];
  selected: Customer[] = [];
  filterValue: string = '';

  constructor(private _customerService: CustomerService,
              private _changeDetector: ChangeDetectorRef,
              private _dialogRef: MatDialogRef<CustomerPicker>) {
  }

  close() {
    this._dialogRef.close(this.selected[0]);
  }

  cancel() {
    this._dialogRef.close()
  }

  async ngOnInit() {
    this.isLoaded = true;

    try {
      this.customers = await this._customerService.listAsync();
      this.displayedCustomers = this.customers.slice()
      this.isLoaded = false;
    } catch (e) {
      this.isLoaded = false;
    }
  }

  filter(event) {
    if(this.filterValue) {
      this.displayedCustomers = this.customers.filter(c => c.fullName.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1)
    }else {
      this.displayedCustomers = this.customers.slice()
    }

    this._changeDetector.markForCheck();
  }
}
