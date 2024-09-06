import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../auth/roles/roles.decorator";
import { Role } from "../enum/user-role.enum";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { DemandService } from "./demand.service";
import { User } from "../users/entities/user.entity";
import { RolesGuard } from "../auth/roles/roles.guard";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(RolesGuard)
@Controller("demand")
@ApiTags("Demands")
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @Roles([Role.ADMIN])
  @Get("received")
  getPendingDemands() {
    return this.demandService.getDemands(false);
  }

  @Roles([Role.ADMIN])
  @Get("received/all")
  getAllDemands() {
    return this.demandService.getDemands(true);
  }

  @Roles([Role.ADMIN])
  @Patch("grant/:userId/")
  async acceptDemand(@Param("userId") id: string) {
    await this.demandService.respondDemand(id, true);
    return { message: "access granted" };
  }

  @Roles([Role.ADMIN])
  @Patch("revoke/:userId/")
  async refuseDemand(@Param("userId") id: string) {
    await this.demandService.respondDemand(id, false);
    return { message: "access revoked" };
  }

  @Roles([Role.CONSUMER])
  @Post("request")
  async requestDemand(@CurrentUser() user: User) {
    const res = await this.demandService.requestDemand(user.id.toString());
    return {
      message: res
        ? "Your demand is Pending"
        : "Your demand is already Approved",
    };
  }

  @Roles([Role.CONSUMER])
  @Delete("cancel")
  async cancelDemand(@CurrentUser() user: User) {
    const res = await this.demandService.cancelDemand(user.id.toString());
    return {
      message: res ? "canceled successfully" : "unable to cancel your demand. ",
    };
  }

  @Roles([Role.ADMIN])
  @Get("granted")
  async getGrantedUser() {
    return this.demandService.getGrantedUsers();
  }

  @Roles([Role.CONSUMER])
  @Get("sent")
  async getMine(@CurrentUser() user: User) {
    return this.demandService.getDemandByUserId(user.id.toString());
  }
}
