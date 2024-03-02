"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmSQLITETestingModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const match_entity_1 = require("../match/entities/match.entity");
const TypeOrmSQLITETestingModule = () => [
    typeorm_1.TypeOrmModule.forRoot({
        type: "better-sqlite3",
        database: ":memory:",
        dropSchema: true,
        entities: [match_entity_1.Match],
        synchronize: true,
    }),
    typeorm_1.TypeOrmModule.forFeature([match_entity_1.Match]),
];
exports.TypeOrmSQLITETestingModule = TypeOrmSQLITETestingModule;
//# sourceMappingURL=TypeORMSQLITETestingModule.js.map