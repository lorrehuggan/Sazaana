import * as React from "react";

export interface ISignInProps {}

export default function SignIn(props: ISignInProps) {
  return (
    <div className="r-width mt-4 rounded-md bg-base-300 p-3 shadow-lg">
      <h3 className="border-b-[1px] font-bold text-primary">
        Keep your tracks
      </h3>
      <p className="mt-2 text-xs">
        Sign in with Spotify and save your songs to a playlist
      </p>
      <button className="primary-gradient mt-3 w-full rounded-md p-2 text-xs text-white">
        Sign in to save
      </button>
    </div>
  );
}
