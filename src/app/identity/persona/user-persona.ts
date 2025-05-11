import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {User, UserProfileService} from "@app/identity";
import {MyPersonaImage, MyPersonaText, Persona} from "neo-ui";
import {NgOptimizedImage} from "@angular/common";
import {Subscription} from "rxjs";
import {SERVER_URL} from "@app/http";

export type PersonaSize = '24' | '32' | '40' | '48' | '56' | '72' | '100' | '120' | '180'

@Component({
  templateUrl: 'user-persona.html',
  selector: 'UserPersona',
  standalone: true,
  styles: ':host {display: block}',
  imports: [
    Persona,
    MyPersonaText,
    NgOptimizedImage,
    MyPersonaImage
  ],

})
export class UserPersona implements OnInit {
  @Input()
  user: User

  @Input()
  size: PersonaSize = '40'

  photoUrl: string
  subscription: Subscription

  constructor(private _userProfileService: UserProfileService) {
  }

  ngOnInit() {
    this.photoUrl = this.user.thumbnailId
    this.subscription = this._userProfileService.photoChange.subscribe(data => {
      this.photoUrl = data.thumbnailId;
    })
  }

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

  getPhotoUrl(): string {
    return `${SERVER_URL}/photos/download?photoId=${this.photoUrl}`
  }
}
