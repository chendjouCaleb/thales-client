import {Component, OnInit} from "@angular/core";
import {CustomerService} from "../../services";
import {Customer} from "../../../entities";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  templateUrl: 'customer-picker.html'
})
export class CustomerPicker implements OnInit {
  customers: Customer[] = [];
  isLoaded: boolean = false;

  selected: Customer[] = [];

  constructor(private _customerService: CustomerService,
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
      this.isLoaded = false;
    } catch (e) {
      this.isLoaded = false;
    }
  }
}
