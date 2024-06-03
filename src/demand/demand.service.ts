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

  async requestDemand(userId: string) {
    const old = await this.demandModel.findOne({ userId: userId }).exec();
    if (old?.status === ApproveStatus.APPROVED) {
      return false;
    } else if (old) {
      return await this.demandModel
        .findOneAndUpdate({ userId }, { status: ApproveStatus.PENDING })
        .exec();
    }

    const doc = new this.demandModel({
      userId: userId,
      status: ApproveStatus.PENDING,
    });
    doc.id = doc._id.toString();
    return await doc.save();
  }

  async getDemands(isEverything: boolean) {
    const criteria = isEverything ? {} : { status: ApproveStatus.PENDING };
    const demands = await this.demandModel.find(criteria).lean().exec();
    return Demand.fromArray(demands);
  }

  async respondDemand(userId: string, grant: boolean) {
    await this.usersService.changeRole(userId, grant);
    await this.demandModel
      .findOneAndUpdate(
        { userId: userId },
        { status: grant ? ApproveStatus.APPROVED : ApproveStatus.REJECTED },
      )
      .lean()
      .exec();
  }

  async cancelDemand(userId: string) {
    const demand = await this.demandModel
      .findOne({ userId: userId })
      .lean()
      .exec();
    if (!demand || demand.status !== ApproveStatus.PENDING) {
      return false;
    }
    await this.demandModel.findOneAndDelete({ userId: userId }).lean().exec();
    return true;
  }

  getGrantedUsers() {
    return this.usersService.getAllSellers();
  }

  async getDemandByUserId(userId: string) {
    return Demand.fromDoc(
      await this.demandModel.findOne({ userId: userId }).lean().exec(),
    );
  }
}
