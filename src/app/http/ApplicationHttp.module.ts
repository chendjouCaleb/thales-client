import {NgModule} from "@angular/core";
import {CustomerHttp} from "./customer.http";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [ HttpClientModule ],
  providers: [ CustomerHttp ]
})
export class ApplicationHttpModule {}
