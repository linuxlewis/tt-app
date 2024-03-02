import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";
import { Match } from "./entities/match.entity";
import { Repository } from "typeorm";
import { SocketService } from "../socket.service";
export declare class MatchService {
    private readonly matchRepository;
    private readonly socketService;
    constructor(matchRepository: Repository<Match>, socketService: SocketService);
    create(createMatchDto: CreateMatchDto): Promise<Match>;
    findAll(): Promise<Match[]>;
    count(): Promise<number>;
    last(): Promise<Match>;
    findOne(id: number): Promise<Match>;
    update(id: number, updateMatchDto: UpdateMatchDto): Promise<Match>;
    remove(id: number): string;
}
