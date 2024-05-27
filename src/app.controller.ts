import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { CurrentUser } from "./auth/decorators/user.decorator";
import * as fs from "fs";
import { WsJwtGuard } from "./auth/guards/ws-auth.guard";

@Controller()
@ApiTags("Genral")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getDocuments() {
    return await fs.readFileSync("index.html", "utf-8");
  }

  @Get("/public/index.js")
  async getJsFile() {
    return await fs.readFileSync("public/index.js", "utf-8");
  }

  @Get("test")
  @UseGuards(JwtAuthGuard)
  async test(@CurrentUser() user) {
    return user;
  }
}
