import { UserRoleEnum } from '@Shared/enums/user-role.enum';

export class GetUserResponseDto {
  // TODO: Swagger
  id: number;
  name: string;
  email: string;
  cpf: string;
  roles: UserRoleEnum[];
}
