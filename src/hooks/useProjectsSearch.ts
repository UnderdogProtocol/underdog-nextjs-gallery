import {
  SearchProjectsRequest,
  SearchProjectsResponse,
} from "@underdog-protocol/js";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

export const useProjectsSearch = (request: SearchProjectsRequest) => {
  return useQuery<SearchProjectsResponse, AxiosError>(
    ["projects", request],
    async () => {
      const response = await axios.get(
        `/api/underdog/${process.env.NEXT_PUBLIC_NETWORK}/v2/projects/search`,
        { params: request.query }
      );
      return response.data;
    },
    { retry: false }
  );
};
