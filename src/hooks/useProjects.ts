import {
  GetProjectsRequest,
  GetProjectsResponse,
} from "@underdog-protocol/types";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

export const useProjects = (request: GetProjectsRequest) => {
  return useQuery<GetProjectsResponse, AxiosError>(
    ["projects", request],
    async () => {
      const response = await axios.get(`/api/underdog/${process.env.NEXT_PUBLIC_NETWORK}/v2/projects`);
      return response.data;
    },
    { retry: false }
  );
};
