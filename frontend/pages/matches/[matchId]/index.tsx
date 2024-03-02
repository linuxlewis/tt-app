import { useCallback } from "react";
import { useRouter } from "next/router";
import { Board } from "../../../types/match";
import { Grid, Typography, Paper } from "@mui/material";

import { useTicTacToe } from "../../../hooks/useTicTacToe";

import { TicTacToeBoard } from "../../../components/TicTacToe/TicTacToeBoard";

const textStyles = {
  textAlign: "center",
};

const MatchLayout = () => {
  const router = useRouter();
  const matchId = router.query.matchId as string;

  const { match, isPlayerTurn, winningPlayer, playerToken, boardMutation } =
    useTicTacToe({ matchId });

  const onClick = useCallback(
    (rowIndex: number, columnIndex: number) => {
      if (match) {
        const updatedBoard: Board = [...match.board];
        updatedBoard[rowIndex][columnIndex] = playerToken;
        boardMutation.mutate(updatedBoard);
      }
    },
    [match, boardMutation, playerToken]
  );

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Paper
        sx={{
          margin: "auto",
          width: 720,
          height: 540,
          padding: 4,
        }}
      >
        <Grid container spacing={3} flexDirection="column">
          <Grid item xs={12}>
            <Typography sx={textStyles} variant="h4">
              Tic Tac Toe
            </Typography>

            <Typography sx={textStyles} variant="body1">
              You are {playerToken === 1 ? "X" : "O"}
            </Typography>

            {match && (
              <TicTacToeBoard
                board={match.board}
                isDisabled={
                  boardMutation.isLoading ||
                  !isPlayerTurn ||
                  winningPlayer !== null
                }
                onClick={onClick}
              />
            )}

            {isPlayerTurn && winningPlayer === null && (
              <Typography sx={{ color: "red", ...textStyles }}>
                Its your turn
              </Typography>
            )}
            {!isPlayerTurn && winningPlayer === null && (
              <Typography sx={textStyles}>
                Waiting for other players turn
              </Typography>
            )}

            {winningPlayer !== null && (
              <Typography sx={textStyles}>
                Game over Player {winningPlayer === match?.player1 ? "X" : "O"}{" "}
                has won
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MatchLayout;
