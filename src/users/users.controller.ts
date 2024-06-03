import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { Roles } from "../auth/roles/roles.decorator";
import { Role } from "../enum/user-role.enum";
import { RolesGuard } from "../auth/roles/roles.guard";

@ApiTags("Users")
@Controller("users")
@UseGuards(RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    // @Inject(forwardRef(() => PrimalJwtGuard))
    // private readonly primalJwtGuard: PrimalJwtGuard,
  ) {}

  @Get("infos")
  @UseGuards(JwtAuthGuard) // Assuming AuthGuard is your authentication guard
  async whoami(@CurrentUser() user) {
    return user;
  }

  @Patch("infos")
  @UseGuards(JwtAuthGuard) // Assuming AuthGuard is your authentication guard
  async changeInfos(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.update(user.id, updateUserDto);
  }

  @Roles([Role.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Get("email/:email")
  findOneByEmail(@Param("email") email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Get()
  @Roles([Role.ADMIN])
  async findAll(
    @Query("transform")
    transform: boolean, // Type hint for clarity
  ) {
    return this.usersService.findAll(Boolean(transform));
  }

  @Roles([Role.CONSUMER])
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Roles([Role.ADMIN])
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(id, updateUserDto);
    return User.clean(await this.usersService.findOne(id));
  }

  @Roles([Role.ADMIN])
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
