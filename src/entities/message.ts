import {BaseEntity} from "./base-entity";
import {formatPhoneNumber} from "@app/utils";
import {DateTime} from "luxon";

export class Message extends BaseEntity<number> {
  fullName: string = '';
  email: string = '';
  postalCode: string = '';
  phoneNumber: string = '';
  content: string = '';
  readAt: DateTime;


  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.fullName = value.fullName;
      this.email = value.email;
      this.postalCode = value.postalCode;
      this.phoneNumber = value.phoneNumber;
      this.content = value.content;
      this.readAt = value.readAt ? DateTime.fromISO(value.readAt) : null;
    }
  }

  get formattedPhoneNumber1(): string {
    return formatPhoneNumber(this.phoneNumber);
  }

  get isRead(): Boolean {
    return this.readAt != null;
  }
}

