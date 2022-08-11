import { useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import { intToString } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

export interface IQueryProps {}

export default function Query(props: IQueryProps) {
  const artistData = useAppSelector((state: RootState) => state.dataState.data);
  const handleReset = () => {};
  return (
    <div className="canvas-width mx-auto mt-4 flex h-11 items-center space-x-4 xl:mt-8 ">
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
                <span className="text-xs xl:text-base ">
                  {intToString(artistData[0].query.followers)}
                </span>
                <span className="text-xs">FOLLOWERS</span>
              </div>
            </div>
            <button onClick={handleReset}>
              <AiOutlineClose className="text-3xl" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
