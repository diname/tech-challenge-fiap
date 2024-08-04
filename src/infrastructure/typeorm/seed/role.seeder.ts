import { RoleEntity } from '@Infrastructure/entities/role.entity';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class RoleSeeder extends SeederBase<RoleEntity> {
  constructor(connection: Connection) {
    let repository = connection.getRepository(RoleEntity);
    super(repository);
    this.tableName = 'Role';
  }

  protected dataToSeed(): RoleEntity[] {
    return [
      { id: 1, name: 'administrador' },
      { id: 2, name: 'cliente' },
    ] as RoleEntity[];
  }
}
