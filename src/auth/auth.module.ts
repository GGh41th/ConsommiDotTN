import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles/roles.guard';

@Module({
  providers: [AuthService, RolesGuard],
  exports : [RolesGuard]
})
export class AuthModule {}
