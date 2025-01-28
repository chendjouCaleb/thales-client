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

  data(): AuthData {
    return {
      accessToken: this.jwtToken,

      sessionId: this.session.id
    }
  }
}

export interface AuthData {
  accessToken: string,
  refreshToken?: string,
  sessionId: string
}
