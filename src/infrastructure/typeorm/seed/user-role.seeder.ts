import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserRoleModel } from '../models/user-role.model';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class UserRoleSeeder extends SeederBase<UserRoleModel> {
  constructor(dataSource: DataSource) {
    const repository = dataSource.getRepository(UserRoleModel);
    super(repository);
    this.tableName = 'UserRole';
  }

  protected dataToSeed(): UserRoleModel[] {
    return [
      {
        id: 1,
        role: { id: 1 },
        user: { id: 1 },
      },
      {
        id: 2,
        role: { id: 3 },
        user: { id: 2 },
      },
      {
        id: 3,
        role: { id: 2 },
        user: { id: 3 },
      },
    ] as UserRoleModel[];
  }
}
