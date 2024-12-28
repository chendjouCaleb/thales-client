import {Component, Input} from "@angular/core";
import {Debt} from "@entities/finance";
import {NgIf} from "@angular/common";

@Component({
  templateUrl: 'debt-details.html',
  selector: '[DebtDetails], DebtDetails',
  imports: [
    NgIf
  ],
  standalone: true
})
export class DebtDetails {
  @Input()
  debt: Debt
}
