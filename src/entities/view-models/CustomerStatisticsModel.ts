export class CustomerStatisticsModel{
  count: number;
  favoriteCount: number;
  archiveCount: number;

  get nonArchivedCount() {
    return this.count - this.archiveCount;
  }

  constructor(value: any = {}) {
    if (value) {
      this.count = value.count;
      this.favoriteCount = value.favoriteCount;
      this.archiveCount = value.archiveCount;
    }
  }
}
