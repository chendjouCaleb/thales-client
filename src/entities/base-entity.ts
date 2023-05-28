export class BaseEntity<TID> {
  id: TID;
  createdAt: Date;

  deletedAt: Date;

  get deleted(): Boolean {
    return this.deletedAt != null;
  }
}
