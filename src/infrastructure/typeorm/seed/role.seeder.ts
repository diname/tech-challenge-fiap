import { Injectable } from '@nestjs/common';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { DataSource } from 'typeorm';
import { RoleModel } from '../models/role.model';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class RoleSeeder extends SeederBase<RoleModel> {
  constructor(dataSource: DataSource) {
    const repository = dataSource.getRepository(RoleModel);
    super(repository);
    this.tableName = 'Role';
  }

  protected dataToSeed(): RoleModel[] {
    return [
      { id: 1, name: UserRoleEnum.ADMIN },
      { id: 2, name: UserRoleEnum.CUSTOMER },
      { id: 3, name: UserRoleEnum.PREP_LINE },
    ] as RoleModel[];
  }
}
