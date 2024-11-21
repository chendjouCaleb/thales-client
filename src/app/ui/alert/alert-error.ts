import {Component, ViewEncapsulation} from "@angular/core";
import {LucideAngularModule, AlertCircleIcon} from 'lucide-angular';

@Component({
  templateUrl: 'alert-error.html',
  styleUrl: 'alert.scss',
  selector: 'AlertError',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    class: 'my-alert'
  }
})
export class AlertError {
  icons = { AlertCircleIcon}
}
