import {Injectable} from "@angular/core";
import {SessionStore} from "@app/utils";
import {ProcedureStepFormModel} from "@app/models";

export interface IResetPasswordData {
  email: string,
  code: string,
  password: string
}


export class ProcedureAddRemember {
  store = new SessionStore('procedure-add');

  constructor() {}

  get name(): string { return this.store.getItem('name'); }
  set name(value: string) { this.store.setItem('name', value); }

  get description(): string { return this.store.getItem('description'); }
  set description(value: string) { this.store.setItem('description', value); }


  get stepModels(): ProcedureStepFormModel[] { return this.store.getItem('stepModels'); }
  set stepModels(value: ProcedureStepFormModel[] ) { this.store.setItem('stepModels', value); }

  clear() {
    this.store.clear();
  }

}




