import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IsAuthGuardFunc, IsNotAuthGuardFunc} from "@app/identity";
import {CustomerPage} from "@app/customers";



@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
