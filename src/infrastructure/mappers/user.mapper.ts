import { UserModel } from '@Domain/models/user.model';
import { UserEntity } from '@Infrastructure/entities/user.entity';

export class UserMapper {
  static toModel(userEntity: UserEntity): UserModel {
    const userModel = new UserModel();
    userModel.id = userEntity.id;
    userModel.name = userEntity.name;
    userModel.cpf = userEntity.cpf;
    userModel.createdAt = userEntity.createdAt;
    userModel.updatedAt = userEntity.updatedAt;
    userModel.deletedAt = userEntity.deletedAt;

    return userModel;
  }

  static toEntity(userModel: UserModel): UserEntity {
    const userEntity = new UserEntity();
    userEntity.name = userModel.name;
    userEntity.email = userModel.email;
    userEntity.cpf = userModel.cpf;
    userEntity.password = userModel.password;

    return userEntity;
  }
}
