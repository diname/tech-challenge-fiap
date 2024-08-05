import { UserEntity } from '@Domain/entities/user.entity';
import { UserModel } from '@Infrastructure/typeorm/models/user.model';

export class UserMapper {
  static toEntity(userEntity: UserModel): UserEntity {
    const user = new UserEntity();
    user.id = userEntity.id;
    user.name = userEntity.name;
    user.cpf = userEntity.cpf;
    user.password = userEntity.password;
    user.createdAt = userEntity.createdAt;
    user.updatedAt = userEntity.updatedAt;
    user.deletedAt = userEntity.deletedAt;

    return user;
  }

  static toModel(userModel: UserEntity): UserModel {
    const user = new UserModel();
    user.name = userModel.name;
    user.email = userModel.email;
    user.cpf = userModel.cpf;
    user.password = userModel.password;

    return user;
  }
}
