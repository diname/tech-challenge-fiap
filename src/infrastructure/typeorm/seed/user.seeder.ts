import { Injectable } from '@nestjs/common';
import { hashUserPassword } from '@Shared/utils/auth.util';
import { DataSource } from 'typeorm';
import { UserModel } from '../models/user.model';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class UserSeeder extends SeederBase<UserModel> {
  constructor(dataSource: DataSource) {
    const repository = dataSource.getRepository(UserModel);
    super(repository);
    this.tableName = 'User';
  }

  protected dataToSeed(): UserModel[] {
    return [
      {
        id: 1,
        name: 'administrador',
        email: 'admin@gmail.com',
        cpf: '49499582891',
        password: hashUserPassword('admin'),
      },
      {
        id: 2,
        name: 'cozinha',
        email: 'cozinha@gmail.com',
        cpf: '49499582893',
        password: hashUserPassword('cozinha'),
      },
    ] as UserModel[];
  }
}
