import {NgModule} from "@angular/core";
import {CustomerHttp} from "./customer.http";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

@NgModule({ imports: [], providers: [CustomerHttp, provideHttpClient(withInterceptorsFromDi())] })
export class ApplicationHttpModule {}
