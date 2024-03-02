import { Inject, Injectable } from "@nestjs/common";
import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";
import { Match } from "./entities/match.entity";

import { Repository } from "typeorm";

import { InjectRepository } from "@nestjs/typeorm";
import { SocketService } from "../socket.service";

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @Inject(SocketService)
    private readonly socketService: SocketService,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const matchThatNeedsPlayer = await this.matchRepository
      .createQueryBuilder("matches")
      .where("matches.completedAt is null")
      .andWhere("matches.player1 is not null")
      .andWhere("matches.player2 is null")
      .getOne();

    if (matchThatNeedsPlayer) {
      matchThatNeedsPlayer.player2 = createMatchDto.player;
      await this.matchRepository.save(matchThatNeedsPlayer);
      this.socketService.socket.emit("match", matchThatNeedsPlayer);
      return matchThatNeedsPlayer;
    } else {
      const newMatch = await this.matchRepository.save({
        player1: createMatchDto.player,
      });
      return newMatch;
    }
  }

  async findAll(): Promise<Match[]> {
    return await this.matchRepository.find();
  }

  async count(): Promise<number> {
    return await this.matchRepository.count();
  }

  async last(): Promise<Match> {
    return await this.matchRepository
      .createQueryBuilder("matches")
      .orderBy("matches.createdAt", "DESC")
      .getOne();
  }

  async findOne(id: number): Promise<Match> {
    return await this.matchRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    await this.matchRepository.save({
      ...updateMatchDto,
      id,
    });

    const match = await this.matchRepository.findOne({ where: { id } });

    this.socketService.socket.emit("match", match);
    return match;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
