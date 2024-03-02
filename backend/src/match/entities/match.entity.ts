import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export type BoardSquare = null | 0 | 1;
export type BoardRow = [BoardSquare, BoardSquare, BoardSquare];
export type Board = [BoardRow, BoardRow, BoardRow];

@Entity("matches")
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @Column("simple-json", {
    default: JSON.stringify([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]),
  })
  board: Board;

  @Column({ nullable: true }) // 1
  player1: string;

  @Column({ nullable: true }) // 0
  player2: string;
}
