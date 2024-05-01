import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('TokenGuard', () => {
  it('should be defined', () => {
    expect(RolesGuard).toBeDefined();
  });
});
