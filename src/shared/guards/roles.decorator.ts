import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';

export const Roles = (...roles: UserRoleEnum[]) => SetMetadata('roles', roles);
