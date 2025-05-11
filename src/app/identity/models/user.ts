import {DateTime} from "luxon";
import {SERVER_URL} from "@app/http";

export class User {
  constructor(value: any = null) {
    if (value) {
      this.id = value.id;
      this.fullName = value.fullName;
      this.userName = value.userName;
      this.normalizedName = value.normalizedName;
      this.email = value.email;
      this.normalizedEmail = value.normalizedEmail;

      this.createdAt = DateTime.fromISO(value.createdAt);

      this.actorId = value.actorId;
      this.publisherId = value.publisherId;
      this.subjectId = value.subjectId;

      this.photoId = value.photoId;
      this.thumbnailId = value.thumbnailId;
      this.color = value.color;

    }
  }

  id: string = '';
  createdAt: DateTime;
  fullName: string = '';

  userName: string = '';
  normalizedName: string = '';

  email: string = '';
  normalizedEmail: string = '';

  actorId: string = '';
  publisherId: string = '';
  subjectId: string = '';

  photoId: string;
  thumbnailId: string;
  color: string


  hasPhoto(): boolean {
    return this.photoId !== '00000000-0000-0000-0000-000000000000'
  }
  getThumbnailUrl(): string {
    return `${SERVER_URL}/photos/download?photoId=${this.thumbnailId}`
  }
}
