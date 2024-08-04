import { UserRoleEnum } from '@Shared/enums/user-role.enum';

export class CreateUserCommand {
  constructor(
    public readonly user: {
      name: string;
      email: string;
      role: UserRoleEnum;
      cpf?: string;
      password?: string;
    },
  ) {}
}
