import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from './auth/roles/roles.decorator';

@Controller()
@ApiTags('Genral')
@Roles(['User'])
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Roles(['Admin','User'])
  @Get('/nada')
  nothing(): string {
    return 'Nothhing';
  }
}
