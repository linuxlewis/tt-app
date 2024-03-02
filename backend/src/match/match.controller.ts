import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MatchService } from "./match.service";
import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";
import { Session, Logger } from "@nestjs/common";

@Controller("match")
export class MatchController {
  private readonly logger = new Logger(MatchController.name);
  constructor(private readonly matchService: MatchService) {}

  @Post()
  create(@Session() session: Record<string, any>) {
    const createMatchDto: CreateMatchDto = {
      player: session.id,
    };
    return this.matchService.create(createMatchDto);
  }

  @Get()
  findAll() {
    return this.matchService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.matchService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchService.update(+id, updateMatchDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.matchService.remove(+id);
  }
}
