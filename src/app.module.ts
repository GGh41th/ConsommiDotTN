import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { ProductModule } from "./product/product.module";
import { AuthModule } from "./auth/auth.module";
import * as dotenv from "dotenv";
import { ImageModule } from "./image/image.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { MorganInterceptor, MorganModule } from "nest-morgan";
import { ParseBoolPipe } from "@nestjs/common/pipes";
import { ConversationModule } from "./conversation/conversation.module";
import { SocketModule } from "./socket/socket.module";
import { ProductHistoryModule } from "./product-history/product-history.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { DemandModule } from './demand/demand.module';

dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: "uploads",
      serveRoot: "/uploads", // This will serve files from /uploads URL path
    }),
    MongooseModule.forRoot("mongodb+srv://consommi:consommi@mainnode.m4kefk0.mongodb.net/ConsommiDotTN?retryWrites=true&w=majority&appName=MainNode"),

    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProductModule,
    AuthModule,
    ImageModule,
    MorganModule,
    ConversationModule,
    SocketModule,
    ProductHistoryModule,
    DemandModule,
  ],
  controllers: [AppController],
  providers: [
    ParseBoolPipe,
    AppService,
    /*     {
      provide: APP_FILTER,
      useClass: LoggingExceptionFilter,
    }, */
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor("combined"),
    },
  ],
})
export class AppModule {}
