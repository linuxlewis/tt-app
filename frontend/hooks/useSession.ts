import { useQuery } from "react-query";
import axios from "axios";
import { AxiosResponse } from "axios";
import { Session } from "../types/session";

const useSession = () => {
  const sessionQuery = useQuery<AxiosResponse<Session>>("session", () => {
    return axios.get("http://localhost:3001/session", {
      withCredentials: true,
    });
  });

  return sessionQuery;
};

export { useSession };
