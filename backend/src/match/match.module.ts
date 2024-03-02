import { Module } from "@nestjs/common";
import { MatchService } from "./match.service";
import { MatchController } from "./match.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Match } from "./entities/match.entity";
import { SocketModule } from "../socket.module";

@Module({
  imports: [TypeOrmModule.forFeature([Match]), SocketModule],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
