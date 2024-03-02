import { Board } from "../../types/match";
import { Grid } from "@mui/material";
import { ToeButton } from "./ToeButton";

const TicTacToeBoard = ({
  board,
  isDisabled,
  onClick,
}: {
  board: Board;
  isDisabled: boolean;
  onClick: (rowIndex: number, columnIndex: number) => void;
}) => {
  return (
    <Grid container flexDirection={"column"} gap={1}>
      {board.map((row, rowIndex) => {
        return (
          <Grid container key={rowIndex} gap={1} justifyContent={"center"}>
            {row.map((square, columnIndex) => (
              <ToeButton
                key={columnIndex}
                value={square}
                isDisabled={isDisabled}
                onClick={() => onClick(rowIndex, columnIndex)}
              />
            ))}
          </Grid>
        );
      })}
    </Grid>
  );
};

export { TicTacToeBoard };
