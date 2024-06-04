import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { ProductSchema } from "src/schemas/Product.schema";
import { ImageModule } from "src/image/image.module";
import {
  Subscription,
  SubscriptionSchema,
} from "src/subscription/entities/subscription.entity";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ProductByIdPipe } from "./pipe/porduct-by-id.pipe";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Product",
        schema: ProductSchema,
      },
      {
        name: Subscription.name, // Use the name property of the Subscription class
        schema: SubscriptionSchema,
      },
    ]),
    ImageModule,
    EventEmitterModule.forRoot(),
    UsersModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductByIdPipe],
  exports: [ProductService],
})
export class ProductModule {}
