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

@Controller()
@ApiTags("Genral")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("test")
  async test() {
    const bcr = require("bcrypt");
    const salt = await bcr.genSalt();
    console.log(await bcr.genSalt());
    console.log(await bcr.genSalt());
    console.log(await bcr.genSalt());
    console.log(await bcr.genSalt());
    const pass = await bcr.hash("kjk", salt);
    const isit = await bcr.compare(pass, pass);

    console.log("salt");
    console.log(salt);
    console.log("pass");
    console.log(pass);
    console.log("isit");
    console.log(isit);
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
