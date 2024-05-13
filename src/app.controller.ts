import {
  Controller,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import { PrimalJwtGuard } from "./auth/token/primal.guard";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { CurrentUser } from "./auth/decorators/user.decorator";

@Controller()
@ApiTags("Genral")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("test")
  @UseGuards(JwtAuthGuard)
  async test(@CurrentUser() user) {
    return user;
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  getHello(): any {
    const samsa = { email: "pùar", password: "ahah" };

    let myObje = samsa;
    delete myObje.email;
    delete myObje.password;
    return myObje;
    return this.appService.getHello();
  }

  @Get("/nada")
  @UseGuards(PrimalJwtGuard)
  nothing(): string {
    return "Nothhing";
  }
}
