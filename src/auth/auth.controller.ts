import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginCredentialsDTO } from "../users/dto/login-credentials.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Request as ExpressRequest } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get("whoami")
  async whoami(@Request() req: ExpressRequest) {
    return await this.authService.resolvePayload(req);
  }

  @Post("login")
  async login(@Body() credentials: LoginCredentialsDTO) {
    return this.authService.login(credentials);
  }

  @Post("register")
  async register(@Body() credentials: CreateUserDto) {
    return this.authService.register(credentials);
  }
}
