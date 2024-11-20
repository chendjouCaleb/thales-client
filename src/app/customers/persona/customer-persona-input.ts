import {Component, ViewEncapsulation} from "@angular/core";
import {
  LucideAngularModule,
  UserIcon
} from 'lucide-angular';

@Component({
  templateUrl: 'customer-persona-input.html',
  selector: 'CustomerPersonaInput',
  styleUrl: 'customer-persona-input.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    LucideAngularModule
  ],
  host: {
    class: 'customer-persona-input'
  }
})
export class CustomerPersonaInput {
  icons = { UserIcon }
}
