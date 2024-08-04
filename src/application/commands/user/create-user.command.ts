import { UserRoleEnum } from '@Shared/enums/user-role.enum';

export class CreateUserCommand {
  constructor(
    public readonly user: {
      name: string;
      email: string;
      roles: UserRoleEnum[];
      cpf?: string;
      password?: string;
    },
  ) {}
}
