import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ITokenPayload } from '@Shared/interfaces/token-payload.interface';

export const GetCurrentUser = createParamDecorator(
  (_: undefined, context: ExecutionContext): ITokenPayload => {
    const request = context.switchToHttp().getRequest();
    if (request.sub) {
      const user = request.user as ITokenPayload;
      return user;
    }
  },
);
