import { Module } from "@nestjs/common";
import { DemandController } from "./demand.controller";
import { DemandService } from "./demand.service";
import { MongooseModule } from "@nestjs/mongoose";
import { DemandSchema } from "../schemas/Demand.schema";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: "Demand",
        schema: DemandSchema,
      },
    ]),
  ],
  controllers: [DemandController],
  providers: [DemandService],
})
export class DemandModule {}
