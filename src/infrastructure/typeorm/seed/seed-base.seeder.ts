import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class SeederBase<T> {
  constructor(private readonly repository: Repository<T>) {}

  protected tableName: string;
  protected abstract dataToSeed(): T[];

  async seed() {
    const isEmpty = await this.isTableEmpty();
    if (isEmpty) {
      await this.insertRecords();
    }
  }

  private async isTableEmpty(): Promise<boolean> {
    const count = await this.repository.count();
    return count === 0;
  }

  private async insertRecords(): Promise<void> {
    for (const user of this.dataToSeed()) {
      await this.repository.save(user);
    }
  }
}
