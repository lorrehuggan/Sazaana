import React from "react";
import Image from "next/image";
import SpotifyLogo from "@/public/assets/spotify-icon.svg";
import { HiLightningBolt } from "react-icons/hi";
import { SiSpotify } from "react-icons/si";
import { AUTH_URL } from "@/lib/api";
import { User, UserBody, UserClass } from "@/lib/types/User";
import UseAppReset from "@/lib/hooks/useResetApp";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/hooks";
import { setUserState } from "@/lib/Redux/reducers/userReducer";
import { RootState } from "@/lib/Redux/store";

const Header = () => {
  const { resetApp } = UseAppReset();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: RootState) => state.userState.user);

  const handleLogout = () => {
    resetApp();
    dispatch(setUserState(null));
  };

  return (
    <header className="canvas-width mx-auto flex h-14 items-center justify-between lg:h-20">
      <div className="flex items-center space-x-1">
        <span>
          <HiLightningBolt className="text-2xl text-primary xl:text-5xl" />
        </span>
        <span className="display-font font-display text-3xl xl:text-5xl">
          Sazaana
        </span>
      </div>
      <div className="flex cursor-pointer items-center space-x-2 rounded-lg bg-base-300 p-2 shadow-md transition-shadow duration-200 ease-in-out md:hover:shadow-lg">
        {userData ? (
          <>
            <span
              onClick={handleLogout}
              className="text-sm font-bold text-primary"
            >
              Logout
            </span>
          </>
        ) : (
          <a className="flex items-center space-x-2" href={AUTH_URL}>
            <span className="text-sm font-bold">Connect</span>
            <SiSpotify className="text-2xl text-[#17D860]" />
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
