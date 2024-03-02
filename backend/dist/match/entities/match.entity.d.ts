export type BoardSquare = null | 0 | 1;
export type BoardRow = [BoardSquare, BoardSquare, BoardSquare];
export type Board = [BoardRow, BoardRow, BoardRow];
export declare class Match {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    completedAt: Date;
    board: Board;
    player1: string;
    player2: string;
}
