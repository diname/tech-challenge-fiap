import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserRoleModel } from '../models/user-role.model';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class UserRoleSeeder extends SeederBase<UserRoleModel> {
  constructor(connection: Connection) {
    const repository = connection.getRepository(UserRoleModel);
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
    ] as UserRoleModel[];
  }
}
