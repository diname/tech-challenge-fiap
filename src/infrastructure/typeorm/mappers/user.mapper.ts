import { UserEntity } from '@Domain/entities/user.entity';
import { UserModel } from '@Infrastructure/typeorm/models/user.model';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';

export class UserMapper {
  static toEntity(userModel: UserModel): UserEntity {
    const user = new UserEntity();
    if (!userModel) {
      return user;
    }

    user.id = userModel.id;
    user.name = userModel.name;
    user.cpf = userModel.cpf;
    user.password = userModel.password;
    user.roles = userModel.userRoles?.map(
      (userRole) => userRole.role.name as UserRoleEnum,
    );
    user.createdAt = userModel.createdAt;
    user.updatedAt = userModel.updatedAt;
    user.deletedAt = userModel.deletedAt;

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
