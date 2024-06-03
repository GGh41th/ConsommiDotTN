import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Demand } from "./entities/demand.entity";
import { ApproveStatus } from "../enum/product-approve-status.enum";
import { UsersService } from "../users/users.service";

@Injectable()
export class DemandService {
  constructor(
    @InjectModel("Demand") private readonly demandModel: Model<Demand>,
    private readonly usersService: UsersService,
  ) {}

  async requestDemand(user: string) {
    const old = await this.demandModel.findOne({ user: user }).exec();
    if (old?.status === ApproveStatus.APPROVED) {
      return false;
    } else if (old) {
      return await this.demandModel
        .findOneAndUpdate({ user }, { status: ApproveStatus.PENDING })
        .exec();
    }

    const doc = new this.demandModel({
      user: user,
      status: ApproveStatus.PENDING,
    });
    doc.id = doc._id.toString();
    return await doc.save();
  }

  async getDemands(isEverything: boolean) {
    const criteria = isEverything ? {} : { status: ApproveStatus.PENDING };
    const demands = await this.demandModel
      .find(criteria)
      .populate("user")
      .lean()
      .exec();
    const self = this;
    return Demand.fromArray(demands);
  }

  async respondDemand(user: string, grant: boolean) {
    await this.usersService.changeRole(user, grant);
    await this.demandModel
      .findOneAndUpdate(
        { user: user },
        { status: grant ? ApproveStatus.APPROVED : ApproveStatus.REJECTED },
      )
      .lean()
      .exec();
  }

  async cancelDemand(user: string) {
    const demand = await this.demandModel.findOne({ user: user }).lean().exec();
    if (!demand || demand.status !== ApproveStatus.PENDING) {
      return false;
    }
    await this.demandModel.findOneAndDelete({ user: user }).lean().exec();
    return true;
  }

  getGrantedUsers() {
    return this.usersService.getAllSellers();
  }

  async getDemandByUserId(user: string) {
    return Demand.fromDoc(
      await this.demandModel.findOne({ user: user }).lean().exec(),
    );
  }
}
