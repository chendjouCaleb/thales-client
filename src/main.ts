import {bootstrapApplication} from '@angular/platform-browser';
import './date'
import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {appConfig} from "@app/app.config";
import {AppComponent} from "@app/app.component";

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  standalone: true,
  template: `
    Hello Angular!
  `,
})
export class App {}


bootstrapApplication(AppComponent , appConfig)
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
