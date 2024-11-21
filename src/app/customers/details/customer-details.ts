import {Component, Input, ViewEncapsulation} from "@angular/core";
import {Customer} from "@entities/customer";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {
  LucideAngularModule, CakeIcon, UserIcon, MailIcon, MapPinIcon, PhoneIcon, BrainIcon, BuildingIcon,
  BabyIcon, CalendarIcon, BriefcaseBusinessIcon, GlobeIcon
} from 'lucide-angular';
import {getMaritalStatus, getSex} from "../../../human";
import {getAddressLabel, getContactLabel} from "@app/conctact";
import {getCountry} from "../../../countries";
import {getLanguageDescriptor, getLanguageLevel} from "../../../languages";
import {getOccupationLevel} from "../../../work";


@Component({
  templateUrl: 'customer-details.html',
  styleUrl: 'customer-details.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatButton,
    NgIf,
    LucideAngularModule
  ],
  selector: 'CustomerDetails, [CustomerDetails]'
})
export class CustomerDetails {
  icons = { CakeIcon, UserIcon, MailIcon, MapPinIcon, PhoneIcon, BrainIcon,
  BabyIcon, BuildingIcon, CalendarIcon, BriefcaseBusinessIcon, GlobeIcon }
  @Input()
  customer: Customer

  protected readonly getSex = getSex;
  protected readonly getMaritalStatus = getMaritalStatus;
  protected readonly getContactLabel = getContactLabel;
  protected readonly getAddressLabel = getAddressLabel;
  protected readonly getCountry = getCountry;
  protected readonly getLanguageLevel = getLanguageLevel;
  protected readonly getLanguageDescriptor = getLanguageDescriptor;
  protected readonly getOccupationLevel = getOccupationLevel;
}
