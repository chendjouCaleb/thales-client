import {Session} from "./session";
import {DateTime} from "luxon";

export class LoginResult {
  constructor(value: any = null) {
    if (value) {
      this.session = new Session(value.session);
      this.jwtToken = value.jwtToken;
    }
  }

  session: Session;
  jwtToken: string = '';

}
