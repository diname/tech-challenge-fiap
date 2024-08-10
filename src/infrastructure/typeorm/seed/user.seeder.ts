import { UserModel } from '@Infrastructure/typeorm/models/user.model';
import { Injectable } from '@nestjs/common';
import { hashUserPassword } from '@Shared/utils/auth.util';
import { Connection } from 'typeorm';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class UserSeeder extends SeederBase<UserModel> {
  constructor(connection: Connection) {
    const repository = connection.getRepository(UserModel);
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
