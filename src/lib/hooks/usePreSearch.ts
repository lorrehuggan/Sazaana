import { useQuery } from "@tanstack/react-query";
import { ArtistResponse } from "../types/PreSearch";

export const getPreArtist = async (id: string, state: string) => {
  const response = await fetch(
    `http://localhost:5000/api/main/pre-search?${state}=${id}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};

const usePreArtistSearch = (value: string, state: string) => {
  const { data } = useQuery<ArtistResponse, Error>(
    ["preSearch", value],
    () => getPreArtist(value, state),
    {
      enabled: false,
    }
  );

  return { data };
};

export default usePreArtistSearch;
