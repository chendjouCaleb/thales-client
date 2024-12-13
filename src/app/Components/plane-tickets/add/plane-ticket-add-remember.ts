import {SessionStore} from "@app/utils";


export class PlaneTicketAddRemember {
  store = new SessionStore('plane-ticket-add');

  constructor() {}


  get placeCount(): number { return this.store.getItem('placeCount'); }
  set placeCount(value: number) { this.store.setItem('placeCount', value); }

  get price(): number { return this.store.getItem('price'); }
  set price(value: number) { this.store.setItem('price', value); }

  get backAndForth(): boolean { return this.store.getItem('backAndForth'); }
  set backAndForth(value: boolean) { this.store.setItem('backAndForth', value); }

  get travelClass(): string { return this.store.getItem('travelClass'); }
  set travelClass(value: string) { this.store.setItem('travelClass', value); }

  get departureCountry(): string { return this.store.getItem('departureCountry'); }
  set departureCountry(value: string) { this.store.setItem('departureCountry', value); }

  get departureCity(): string { return this.store.getItem('departureCity'); }
  set departureCity(value: string) { this.store.setItem('departureCity', value); }

  get departureDate(): Date {
   const str = this.store.getItem<string>('departureDate');
   return str ? new Date(Date.parse(str)) : null;
  }
  set departureDate(value: Date) { this.store.setItem('departureDate', value); }

  get arrivalCountry(): string { return this.store.getItem('arrivalCountry'); }
  set arrivalCountry(value: string) { this.store.setItem('arrivalCountry', value); }

  get arrivalCity(): string { return this.store.getItem('arrivalCity'); }
  set arrivalCity(value: string) { this.store.setItem('arrivalCity', value); }

  get returnDate(): Date {
    const str = this.store.getItem('returnDate');
    return str ? new Date(Date.parse(str.toString())) : null;
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
    this.price = value.price;
  }

  clear() {
    this.store.clear();
  }

}




