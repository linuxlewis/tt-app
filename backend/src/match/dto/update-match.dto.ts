import { Board } from "../entities/match.entity";

export class UpdateMatchDto {
  completedAt?: Date;
  board: Board;
}
