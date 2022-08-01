import React from "react";
import Image from "next/image";
import SpotifyLogo from "@/public/assets/spotify-icon.svg";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="r-width flex  h-14 items-center justify-between">
      <span className="font-display text-2xl uppercase">Suzaana</span>
      <div className="flex items-center">
        <span className="text-sm">Connect Spotify</span>
        <span className="relative ml-1 h-5 w-5">
          <Image src={SpotifyLogo} layout="fill" />
        </span>
      </div>
    </header>
  );
};

export default Header;
