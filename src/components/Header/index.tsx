import React from "react";
import Image from "next/image";
import SpotifyLogo from "@/public/assets/spotify-icon.svg";
import { HiLightningBolt } from "react-icons/hi";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="mx-auto flex h-14 w-[95%] items-center justify-between lg:h-20 xl:w-[50%]">
      <div className="flex items-center space-x-1">
        <span>
          <HiLightningBolt className="text-2xl text-primary xl:text-5xl" />
        </span>
        <span className="display-font font-display text-3xl xl:text-5xl">
          Sazaana
        </span>
      </div>
      <div className="flex cursor-pointer items-center rounded-lg bg-base-300 p-2 shadow-md transition-shadow duration-200 ease-in-out md:hover:shadow-lg">
        <span className="text-sm font-bold">Connect</span>
        <span className="relative ml-2 h-5 w-5">
          <Image src={SpotifyLogo} layout="fill" />
        </span>
      </div>
    </header>
  );
};

export default Header;
