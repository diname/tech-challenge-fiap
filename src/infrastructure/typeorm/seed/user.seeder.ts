import { UserModel } from '@Infrastructure/typeorm/models/user.model';
import { Injectable } from '@nestjs/common';
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
      { id: 1, name: 'Kleber', email: 'klebler@gmail.com', cpf: '9043709570' },
      { id: 2, name: 'Vitoria', email: 'vitoria@gmail.com', cpf: '9043709580' },
      { id: 3, name: 'Lucas', email: 'lucas@gmail.com', cpf: '9043709590' },
      { id: 4, name: 'Josef', email: 'josef@gmail.com', cpf: '9043709600' },
      { id: 5, name: 'Jhoni', email: 'jhoni@gmail.com', cpf: '9043709610' },
    ] as UserModel[];
  }
}
