export class PlaneTicketAddModel {
  placeCount: number = 0;
  backAndForth: boolean;
  travelClass: string = '';

  departureCountry: string = '';
  departureCity: string = '';
  departureDate: Date;

  arrivalCountry: string = '';
  arrivalCity: string = '';
  returnDate: Date;

  constructor(value: any = {}) {
    if (value) {
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
  }
}
