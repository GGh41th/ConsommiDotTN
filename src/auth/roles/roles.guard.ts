import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { log } from 'console';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    log('instanciated RolesGuard');
  }

  canActivate(context: ExecutionContext): boolean {
    let roles = this.reflector.get(Roles, context.getHandler());
    let controllerRoles = this.reflector.get(Roles, context.getClass());
    roles = roles ?? controllerRoles;
    log(roles);
    if (!roles) {
      return true;
    }
    if (roles.length === 0 || Object.keys(roles).length === 0) return false;
    if (roles.includes('Guest')) return true;

    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    if (!auth) throw new UnauthorizedException('no token found');
    const cred = Buffer.from(auth.split(' ')[1], 'base64')
      .toString('utf-8')
      .split(':');
    const user = { name: cred[0], pass: cred[1] };
    if (roles.includes('User')) {
      if (['omar', 'yac'].includes(user.name)) {
        return true;
      }
    }
    return ['root'].includes(user.name);
  }
}
