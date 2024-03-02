import { MatchService } from "./match.service";
import { UpdateMatchDto } from "./dto/update-match.dto";
export declare class MatchController {
    private readonly matchService;
    private readonly logger;
    constructor(matchService: MatchService);
    create(session: Record<string, any>): Promise<import("./entities/match.entity").Match>;
    findAll(): Promise<import("./entities/match.entity").Match[]>;
    findOne(id: string): Promise<import("./entities/match.entity").Match>;
    update(id: string, updateMatchDto: UpdateMatchDto): Promise<import("./entities/match.entity").Match>;
    remove(id: string): string;
}
