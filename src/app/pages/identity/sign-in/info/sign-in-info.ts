import {Component} from "@angular/core";
import {Button, IconButton} from "@app/ui";
import {ArrowLeftIcon, LucideAngularModule} from "lucide-angular";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {SignIn} from "@app/pages/identity/sign-in/sign-in";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  templateUrl: 'sign-in-info.html',
  selector: 'SignIInInfo',
  imports: [
    Button,
    IconButton,
    LucideAngularModule,
    TextField,
    TextFieldInput,
    TextFieldLabel,
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true
})
export class SignInInfo {
  icons = { ArrowLeftIcon }
  formControl = new FormControl('')

  constructor(public readonly parent: SignIn,
              private readonly _router: Router,
              private route: ActivatedRoute) {
  }

  next() {
    const name = this.formControl.value;
    this.parent.model.fullName = name;
    this._router.navigate(['email'], { relativeTo: this.parent.route})
  }
}
