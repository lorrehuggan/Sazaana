import UseAppReset from "@/lib/hooks/useResetApp";
import { useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import { intToString } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";
import { AiOutlineClose } from "react-icons/ai";

export interface IQueryProps {}

export default function Query(props: IQueryProps) {
  const artistData = useAppSelector((state: RootState) => state.dataState.data);
  const { resetApp } = UseAppReset();
  return (
    <div className="canvas-width mx-auto mt-4 flex  items-center space-x-4 xl:mt-8 ">
      <div className="flex items-center space-x-3 rounded-md bg-base-300 p-2 shadow-md">
        {artistData && (
          <>
            <div className="relative h-11 w-11 overflow-hidden rounded-md">
              <div className="absolute z-10 h-full w-full bg-gradient-to-r from-accent to-accent-focus  mix-blend-color" />
              <Image
                src={artistData[0].query.image}
                alt={artistData[0].query.name}
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className="space-y-[2px]">
              <p className="text-sm font-bold text-accent xl:text-lg">
                {artistData[0].query.name}
              </p>
              <div className="flex items-center space-x-1">
                <span className="text-xs ">
                  {intToString(artistData[0].query.followers)}
                </span>
                <span className="text-xs">FOLLOWERS</span>
              </div>
            </div>
            <button onClick={resetApp}>
              <AiOutlineClose className="color-transition text-3xl lg:hover:text-accent" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
