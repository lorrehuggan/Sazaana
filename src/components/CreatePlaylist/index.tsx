import { useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { CREATE_PLAYLIST_URL } from "@/lib/api";

export interface ICreatePlaylistProps {}

const fetcher = async (
  playlistName: string,
  collaborative: boolean,
  publicPlaylist: boolean,
  access: string,
  tracks: string[]
) => {
  const response = await fetch(CREATE_PLAYLIST_URL, {
    method: "POST",
    headers: {
      Authorization: "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access,
      playlistName,
      collaborative,
      publicPlaylist,
      tracks,
    }),
  });

  return response.json();
};

export default function CreatePlaylist(props: ICreatePlaylistProps) {
  const artistData = useAppSelector(
    (state: RootState) => state.dataState.data!
  );
  const tracklistState = useAppSelector(
    (state: RootState) => state.tracklistState.tracklist
  )!;
  const userData = useAppSelector((state: RootState) => state.userState.user);
  const [playlistName, setPlaylistName] = React.useState<string>(
    `Sazaana Mix: ${tracklistState[0].query.name}`
  );
  const [isPublic, setIsPublic] = React.useState<boolean>(true);
  const [isCollaborative, setIsCollaborative] = React.useState<boolean>(true);
  const [create, setCreate] = React.useState<boolean>(false);
  const [successMessage, setSuccessMessage] = React.useState<string>("");

  const { data, isLoading, isError } = useQuery(
    ["create-playlist", create],
    () =>
      fetcher(
        playlistName,
        isCollaborative,
        isPublic,
        userData?.access_token!,
        tracklistState?.map((track) => {
          return track.data.trackURI;
        })!
      ),
    {
      enabled: create,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleCreatePlaylist = () => {
    setCreate(true);
  };

  React.useEffect(() => {
    if (data) {
      setCreate(false);
      setSuccessMessage(`Playlist ${playlistName} created`);
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    }
  }, [data]);

  return (
    <div className="mt-6 space-y-2 rounded-md bg-base-100 p-3 shadow lg:mt-0 lg:w-full">
      <div className="flex flex-col space-y-1 border-b-[1px] border-black/20 p-1">
        <label className="text-sm">Playlist Name</label>
        <input
          className=" bg-base-100 focus:outline-none"
          type="text"
          placeholder={`Sazaana Mix: ${artistData[0].query.name}`}
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between space-y-1 border-b-[1px] border-black/20 p-1">
        <label className="text-sm">Public</label>
        <input
          type="checkbox"
          className="toggle"
          checked={isPublic}
          onClick={() => setIsPublic(!isPublic)}
        />
      </div>
      <div className="flex items-center justify-between space-y-1 border-b-[1px] border-black/20 p-1">
        <label className="text-sm">Collaborative</label>
        <input
          type="checkbox"
          className="toggle"
          checked={isCollaborative}
          onClick={() => setIsCollaborative(!isCollaborative)}
        />
      </div>
      <button
        onClick={handleCreatePlaylist}
        className="primary-gradient mt-3 w-full rounded-md p-2 text-xs font-bold text-base-300 active:scale-95 lg:text-sm"
      >
        Save Playlist to Spotify
      </button>
      {successMessage && (
        <div className="text-sm text-success-content">{successMessage}</div>
      )}
    </div>
  );
}
