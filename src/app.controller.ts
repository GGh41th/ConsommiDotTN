import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import * as fs from "fs";
import { RolesGuard } from "./auth/roles/roles.guard";
import { Roles } from "./auth/roles/roles.decorator";
import { Role } from "./enum/user-role.enum";

@Controller()
@ApiTags("Genral")
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getDocuments() {
    return fs.readFileSync("index.html", "utf-8");
  }

  @Get("/public/index.js")
  async getJsFile() {
    return fs.readFileSync("public/index.js", "utf-8");
  }

  @Roles([Role.ADMIN, Role.GUEST])
  @Get("test")
  async test() {
    return "user";
  }
}
