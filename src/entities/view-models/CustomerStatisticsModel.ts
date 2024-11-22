export class CustomerStatisticsModel{
  count: number;
  favoriteCount: number;
  archiveCount: number;

  constructor(value: any = {}) {
    if (value) {
      this.count = value.count;
      this.favoriteCount = value.favoriteCount;
      this.archiveCount = value.archiveCount;
    }
  }
}
