import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginCredentialsDTO } from "../users/dto/login-credentials.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() credentials: LoginCredentialsDTO) {
    return this.authService.login(credentials);
  }

  @Post("register")
  async register(@Body() credentials: CreateUserDto) {
    return this.authService.register(credentials);
  }
}
