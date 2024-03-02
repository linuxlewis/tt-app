import { TypeOrmModule } from "@nestjs/typeorm";
import { Match } from "../match/entities/match.entity";

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: "better-sqlite3",
    database: ":memory:",
    dropSchema: true,
    entities: [Match],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Match]),
];
