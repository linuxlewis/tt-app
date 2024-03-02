"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const match_entity_1 = require("./entities/match.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const socket_service_1 = require("../socket.service");
let MatchService = class MatchService {
    constructor(matchRepository, socketService) {
        this.matchRepository = matchRepository;
        this.socketService = socketService;
    }
    async create(createMatchDto) {
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
        }
        else {
            const newMatch = await this.matchRepository.save({
                player1: createMatchDto.player,
            });
            return newMatch;
        }
    }
    async findAll() {
        return await this.matchRepository.find();
    }
    async count() {
        return await this.matchRepository.count();
    }
    async last() {
        return await this.matchRepository
            .createQueryBuilder("matches")
            .orderBy("matches.createdAt", "DESC")
            .getOne();
    }
    async findOne(id) {
        return await this.matchRepository.findOne({ where: { id } });
    }
    async update(id, updateMatchDto) {
        await this.matchRepository.save({
            ...updateMatchDto,
            id,
        });
        const match = await this.matchRepository.findOne({ where: { id } });
        this.socketService.socket.emit("match", match);
        return match;
    }
    remove(id) {
        return `This action removes a #${id} match`;
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(match_entity_1.Match)),
    __param(1, (0, common_1.Inject)(socket_service_1.SocketService)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        socket_service_1.SocketService])
], MatchService);
//# sourceMappingURL=match.service.js.map