export type BoardSquare = null | 0 | 1;
export type BoardRow = [BoardSquare, BoardSquare, BoardSquare];
export type Board = [BoardRow, BoardRow, BoardRow];

export type Match = {
  id: number;
  createdAt: string;
  updatedAt: string;
  board: Board;
  completedAt: string;
  player1: string;
  player2: string;
};
