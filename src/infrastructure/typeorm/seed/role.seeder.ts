import { RoleEntity } from '@Infrastructure/entities/role.entity';
import { Injectable } from '@nestjs/common';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { Connection } from 'typeorm';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class RoleSeeder extends SeederBase<RoleEntity> {
  constructor(connection: Connection) {
    const repository = connection.getRepository(RoleEntity);
    super(repository);
    this.tableName = 'Role';
  }

  protected dataToSeed(): RoleEntity[] {
    return [
      { id: 1, name: UserRoleEnum.ADMIN },
      { id: 2, name: UserRoleEnum.CUSTOMER },
      { id: 3, name: UserRoleEnum.PREP_LINE },
    ] as RoleEntity[];
  }
}
