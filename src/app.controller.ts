import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import * as fs from "fs";

@Controller()
@ApiTags("Genral")
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

  @Get("test")
  async test() {}
}
