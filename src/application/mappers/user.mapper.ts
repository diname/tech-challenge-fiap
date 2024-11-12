import { UserEntity } from '@Domain/entities/user.entity';
import { GetUserResponseDto } from '../dtos/response/user/get-user.response.dto';

export class UserMapper {
  static toResponseDto(entity: UserEntity): GetUserResponseDto {
    return {
      id: entity.id,
      cpf: entity.cpf,
      name: entity.name,
      email: entity.email,
      roles: entity.roles,
    };
  }
}
