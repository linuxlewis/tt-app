import { useCallback } from "react";
import { Button, Grid, Typography, Paper } from "@mui/material";
import axios from "axios";

import { AxiosResponse } from "axios";

import { useMutation } from "react-query";
import { Match } from "../types/match";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  const createMatchMutation = useMutation<AxiosResponse<Match>>(
    async () => {
      return await axios.post(
        "http://localhost:3001/match",
        {},
        { withCredentials: true }
      );
    },
    {
      onSettled(data, error) {
        if (!error) {
          router.push({
            pathname: "/matches/[matchId]",
            query: {
              matchId: data?.data.id,
            },
          });
        }
      },
    }
  );

  const onClick = useCallback(() => {
    createMatchMutation.mutate();
  }, [createMatchMutation]);

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Paper
        sx={{
          margin: "auto",
          maxWidth: 720,
          minWidth: 310,
          padding: 4,
          maxHeight: 500,
        }}
      >
        <Grid container spacing={3} flexDirection="column">
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center" }} variant="h4">
              Tic Tac Toe
            </Typography>
          </Grid>

          <Grid item>
            <Button
              onClick={onClick}
              variant={"contained"}
              disabled={createMatchMutation.isLoading}
              fullWidth
            >
              New Game
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default Home;
