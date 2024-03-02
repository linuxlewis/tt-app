import axios from "axios";
import { Match, Board } from "../types/match";

import { AxiosResponse, AxiosError } from "axios";

import { useMutation, useQuery, useQueryClient } from "react-query";

import { useEffect, useMemo } from "react";
import { useSession } from "./useSession";
import { WebSocketContext } from "../components/websocket";
import { useContext } from "react";

const useTicTacToe = ({ matchId }: { matchId: string }) => {
  const queryClient = useQueryClient();

  const sessionQuery = useSession();

  const { socket } = useContext(WebSocketContext);

  const matchQuery = useQuery<AxiosResponse<Match>>(matchId, () => {
    return axios.get(`http://localhost:3001/match/${matchId}`, {
      withCredentials: true,
    });
  });
  const match = matchQuery.data?.data;

  const boardMutation = useMutation<
    AxiosResponse<Match>,
    AxiosError<Match>,
    Board
  >(
    (board: Board) => {
      return axios.patch(
        `http://localhost:3001/match/${matchId}`,
        { board },
        { withCredentials: true }
      );
    },
    {
      onSettled(data, error) {
        if (!error) {
          queryClient.setQueryData(matchId, data);
        }
      },
    }
  );

  const winningPlayer = useMemo<string | null>(() => {
    if (match) {
      // check rows
      const rowSums = match.board.map<number | null>((row) => {
        if (row.every((v) => v !== null)) {
          return row.reduce<number>((accum, v) => (v ? accum + v : accum), 0);
        } else {
          return null;
        }
      });

      if (rowSums.findIndex((v) => v === 0) !== -1) {
        return match.player2;
      } else if (rowSums.findIndex((v) => v === 3) !== -1) {
        return match.player1;
      }

      // check columns
      const columnSums = [];
      for (let i = 0; i < 3; i++) {
        const column = match.board.map<number | null>((row) => row[i]);

        if (column.every((v) => v !== null)) {
          columnSums.push(
            column.reduce<number>((accum, v) => (v ? accum + v : accum), 0)
          );
        } else {
          columnSums.push(null);
        }
      }

      if (columnSums.findIndex((v) => v === 0) !== -1) {
        return match.player2;
      } else if (columnSums.findIndex((v) => v === 3) !== -1) {
        return match.player1;
      }

      // check diagnals

      const diag1 = [match.board[0][0], match.board[1][1], match.board[2][2]];
      const diag2 = [match.board[0][2], match.board[1][1], match.board[2][0]];

      const diags = [diag1, diag2];

      const diagSums = diags.map((diag) => {
        if (diag.every((v) => v !== null)) {
          return diag.reduce<number>((accum, v) => (v ? accum + v : accum), 0);
        } else {
          return null;
        }
      });

      if (diagSums.findIndex((v) => v === 0) !== -1) {
        return match.player2;
      } else if (diagSums.findIndex((v) => v === 3) !== -1) {
        return match.player1;
      }
    }

    return null;
  }, [match]);

  const isPlayer1 = useMemo<boolean>(() => {
    if (match) {
      return sessionQuery.data?.data.id === match.player1;
    }
    return false;
  }, [match, sessionQuery]);

  const playerToken = useMemo<1 | 0>(() => {
    return isPlayer1 ? 1 : 0;
  }, [isPlayer1]);

  const isPlayerTurn = useMemo<boolean>(() => {
    if (match) {
      let player1Count = 0;
      let player2Count = 0;

      match.board
        .flatMap((v) => v)
        .map((sq) => {
          if (sq === 0) {
            player2Count++;
          } else if (sq === 1) {
            player1Count++;
          }
        });

      // player1 always goes first
      if (isPlayer1) {
        return player1Count === player2Count;
      } else {
        return player2Count < player1Count;
      }
    }

    return false;
  }, [match, isPlayer1]);

  useEffect(() => {
    const onMatch = (match: Match) => {
      if (match.id.toString() === matchId) {
        queryClient.setQueryData(matchId, { data: match });
      }
    };
    socket.on("match", onMatch);

    return () => {
      socket.off("match", onMatch);
    };
  }, [socket, queryClient, matchId]);

  return {
    boardMutation,
    match,
    isPlayer1,
    isPlayerTurn,
    playerToken,
    winningPlayer,
  };
};

export { useTicTacToe };
