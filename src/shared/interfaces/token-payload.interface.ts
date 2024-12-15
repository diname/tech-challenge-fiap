import { UserRoleEnum } from '@Shared/enums/user-role.enum';

export interface ITokenPayload {
  sub: string;
  roles: UserRoleEnum[];
}
