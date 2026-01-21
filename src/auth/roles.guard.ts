import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

canActivate(context: ExecutionContext): boolean {
  const requiredRoles = this.reflector.getAllAndOverride<string[]>(
    ROLES_KEY,
    [context.getHandler(), context.getClass()],
  );

  const request = context.switchToHttp().getRequest();
  console.log('HEADERS:', request.headers);
  console.log('COOKIES:', request.cookies);
  console.log('USER:', request.user);
  const user = request.user;

  console.log('REQUIRED ROLES:', requiredRoles);
  console.log('ROLE DARI JWT:', user?.role);

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  if (!user || !user.role) {
    return false;
  }

  return requiredRoles.includes(user.role);
}
}
