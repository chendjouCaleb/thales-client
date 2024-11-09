import {Component, OnInit} from "@angular/core";
import {Customer} from "../../../../../entities";
import {CustomerService} from "../../../../services";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'customer-list.page.html'
})
export class CustomerListPage implements OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = ['name', 'sex', 'birthDate', 'action'];

  constructor(private _customerService: CustomerService, public router: Router) {
  }

  async ngOnInit() {
  }
}
