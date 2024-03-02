import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MatchModule } from "./match/match.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Match } from "./match/entities/match.entity";
import { SocketModule } from "./socket.module";
import { AppGateway } from "./app.gateway";
import { SessionModule } from "./session.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db/sql",
      synchronize: true,
      entities: [Match],
    }),
    SocketModule,
    MatchModule,
    SessionModule,
  ],

  controllers: [AppController],
  providers: [AppGateway, AppService],
})
export class AppModule {}
