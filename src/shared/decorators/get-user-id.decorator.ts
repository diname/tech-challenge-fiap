import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ITokenPayload } from '@Shared/interfaces/token-payload.interface';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    if (request.sub) {
      const user = request.user as ITokenPayload;
      return user.sub;
    }
  },
);
