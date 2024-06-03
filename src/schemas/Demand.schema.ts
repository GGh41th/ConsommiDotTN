import { SchemaFactory } from "@nestjs/mongoose";
import { Demand } from "../demand/entities/demand.entity";

export const DemandSchema = SchemaFactory.createForClass(Demand);
