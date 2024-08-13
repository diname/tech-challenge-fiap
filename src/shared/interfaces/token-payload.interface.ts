import { UserRoleEnum } from '@Shared/enums/user-role.enum';

export interface ITokenPayload {
  sub: number;
  roles: UserRoleEnum[];
}
