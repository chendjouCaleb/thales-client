import {Injectable} from "@angular/core";
import {SessionStore} from "../../../../utils";
import {ProcedureStepFormModel} from "../../../../models";


export class PlaneTicketAddRemember {
  store = new SessionStore('plane-ticket-add');

  constructor() {}


  get placeCount(): number { return this.store.getItem('placeCount'); }
  set placeCount(value: number) { this.store.setItem('placeCount', value); }

  get backAndForth(): boolean { return this.store.getItem('backAndForth'); }
  set backAndForth(value: boolean) { this.store.setItem('backAndForth', value); }

  get travelClass(): string { return this.store.getItem('travelClass'); }
  set travelClass(value: string) { this.store.setItem('travelClass', value); }

  get departureCountry(): string { return this.store.getItem('departureCountry'); }
  set departureCountry(value: string) { this.store.setItem('departureCountry', value); }

  get departureCity(): string { return this.store.getItem('departureCity'); }
  set departureCity(value: string) { this.store.setItem('departureCity', value); }

  get departureDate(): Date {
   const str = this.store.getItem('departureDate');
   return new Date(Date.parse(str.toString()))
  }
  set departureDate(value: Date) { this.store.setItem('departureDate', value); }

  get arrivalCountry(): string { return this.store.getItem('arrivalCountry'); }
  set arrivalCountry(value: string) { this.store.setItem('arrivalCountry', value); }

  get arrivalCity(): string { return this.store.getItem('arrivalCity'); }
  set arrivalCity(value: string) { this.store.setItem('arrivalCity', value); }

  get returnDate(): Date {
    const str = this.store.getItem('returnDate');
    return new Date(Date.parse(str.toString()))
  }
  set returnDate(value: Date) {this.store.setItem('returnDate', value); }

  set value(value: any) {
    this.placeCount = value.placeCount;
    this.backAndForth = value.backAndForth;
    this.travelClass = value.travelClass;
    this.departureCountry = value.departureCountry;
    this.departureCity = value.departureCity;
    this.departureDate = value.departureDate;
    this.arrivalCountry = value.arrivalCountry;
    this.arrivalCity = value.arrivalCity;
    this.returnDate = value.returnDate;
  }

  clear() {
    this.store.clear();
  }

}




