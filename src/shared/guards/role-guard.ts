import {
  IAuthService,
  IAuthServiceSymbol,
} from '@Domain/services/auth/auth.service';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(IAuthServiceSymbol)
    private readonly authService: IAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      throw new UnauthorizedException();
    }

    const token: string = authorizationHeader.replace('Bearer ', '');

    const tokenPayload =
      await this.authService.getTokenPayloadFromAccessToken(token);

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return false;
    }
    return tokenPayload.roles.some((r) => roles.includes(r));
  }
}
