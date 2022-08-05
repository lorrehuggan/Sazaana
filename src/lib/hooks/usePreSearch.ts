import { useQuery } from "@tanstack/react-query";
import { ArtistResponse } from "../types/PreSearch";

export const fetcher = async (id: string, state: string) => {
  const response = await fetch(
    `http://localhost:5000/api/main/pre-search?${state}=${id}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};

const usePreSearch = (value: string, state: string) => {
  const { data, isLoading, isError } = useQuery<ArtistResponse>(
    ["preSearch", value],
    () => fetcher(value, state),
    {
      enabled: false,
    }
  );

  return { data, isLoading, isError };
};

export default usePreSearch;
