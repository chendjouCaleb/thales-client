import {Component, Input, ViewEncapsulation} from "@angular/core";
import {User} from "@app/identity";
import {MyPersonaImage, MyPersonaText, Persona} from "neo-ui";
import {NgOptimizedImage} from "@angular/common";

@Component({
  templateUrl: 'user-persona.html',
  selector: 'UserPersona',
  standalone: true,
  imports: [
    Persona,
    MyPersonaText,
    NgOptimizedImage,
    MyPersonaImage
  ],
  encapsulation: ViewEncapsulation.None
})
export class UserPersona {
  @Input()
  user: User



  getPersonaText(): string {
    const names = this.user.fullName.split(' ');

    if(names.length === 1) {
      return names[0][0];
    }

    if(names.length > 1){
      return `${names[0][0]}${names[1][0]}`;
    }
    return ''
  }
}
