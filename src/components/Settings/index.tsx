import { useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import * as React from "react";
import { BiArrowFromTop } from "react-icons/bi";
import Input from "./Input";
import NumberOfTracks from "./NumOfTracks";

export interface ISettingsProps {}

export default function Settings(props: ISettingsProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const trackSettings = useAppSelector(
    (state: RootState) => state.trackSettingsState
  );
  const [statePopularity, setStatePopularity] = React.useState(
    trackSettings.popularity
  );
  return (
    <div
      className={`r-width mt-4 cursor-pointer rounded-md bg-base-300 p-3 shadow-lg`}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between"
      >
        <p className="text-sm">Show Tracklist Settings</p>
        <div
          className={`${
            isOpen ? "rotate-180" : ""
          } transition-transform duration-300 ease-in-out`}
        >
          <BiArrowFromTop />
        </div>
      </div>
      {isOpen && (
        <>
          <NumberOfTracks />
          <Input
            category="Popularity"
            lowLabel="Playing at bars"
            highLabel="World Tour"
            min={0}
            max={100}
            step={10}
            initValue={trackSettings.popularity}
          />
          <Input
            category="Energy"
            lowLabel="Playing at bars"
            highLabel="World Tour"
            min={0}
            max={100}
            step={10}
            initValue={trackSettings.energy}
          />
        </>
      )}
    </div>
  );
}
