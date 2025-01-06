import {Component, Input} from "@angular/core";
import {Debt} from "@entities/finance";
import {NgIf} from "@angular/common";
import {MyBadge} from "@app/NeoUI";

@Component({
  templateUrl: 'debt-details.html',
  selector: '[DebtDetails], DebtDetails',
  imports: [
    NgIf,
    MyBadge
  ],
  standalone: true
})
export class DebtDetails {
  @Input()
  debt: Debt
}
