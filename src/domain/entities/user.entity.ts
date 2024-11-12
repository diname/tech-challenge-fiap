import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { hashUserPassword } from '@Shared/utils/auth.util';

export class UserEntity {
  id: number;
  name: string;
  email: string;
  cpf?: string;
  roles: UserRoleEnum[];
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(createUser?: {
    name: string;
    email: string;
    roles: UserRoleEnum[];
    cpf?: string;
    password?: string;
  }) {
    if (createUser) {
      this.name = createUser.name;
      this.email = createUser.email;
      this.roles = createUser.roles;
      this.cpf = createUser.cpf || null;
      this.password = createUser.password
        ? hashUserPassword(createUser.password)
        : null;
    }
  }
}
