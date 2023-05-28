import {Injectable} from "@angular/core";

export interface IResetPasswordData {
  email: string,
  code: string,
  password: string
}

@Injectable()
export class ResetPasswordState {
  store = new SessionStore('reset-password-state');

  constructor() {
    this.email = this.store.getItem('email');
    this.code = this.store.getItem('code');
  }

  get email(): string {
    return this.store.getItem('email');
  }

  set email(value: string) {
    this.store.setItem('email', value);
  }


  get code(): string {
    return this.store.getItem('code');
  }

  set code(value: string) {
    this.store.setItem('code', value);
  }
}


export class SessionStore {
  data : {[key: string]: any} =  {};
  constructor(public readonly name: string) {
    var value = sessionStorage.getItem(name);
    if(!value){
      sessionStorage.setItem(name, '{}');
    }else {
      this.data = JSON.parse(value);
    }
  }

  setItem(key: string, value: any) {
    this.data[key] = value;
    this.save()
  }

  removeItem(key: string) {
    this.data[key] = undefined;
    this.save();
  }

  clear() {
    this.data = {};
    this.save()
  }

  getItem<T>(key: string) : T{
    return this.data[key];
  }

  save() {
    sessionStorage.setItem(this.name, JSON.stringify(this.data))
  }
}
