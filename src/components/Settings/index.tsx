import { useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import * as React from "react";
import { BiArrowFromTop, BiArrowFromBottom } from "react-icons/bi";
import Input from "./Input";
import NumberOfTracks from "./NumOfTracks";

export interface ISettingsProps {}

export default function Settings(props: ISettingsProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const trackSettings = useAppSelector(
    (state: RootState) => state.trackSettingsState
  );

  return (
    <div
      className={`r-width mt-4 cursor-pointer rounded-md bg-base-300 p-3 shadow-lg lg:w-full`}
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
          <BiArrowFromBottom />
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
            lowLabel="Chill"
            highLabel="No Chill"
            min={0}
            max={1}
            step={0.1}
            initValue={trackSettings.energy}
          />
          <Input
            category="Tempo"
            lowLabel="Slow"
            highLabel="Fast"
            min={0}
            max={250}
            step={10}
            initValue={trackSettings.tempo}
          />
          <Input
            category="Dance-ability"
            lowLabel="Stiff"
            highLabel="Disco Fever"
            min={0}
            max={1}
            step={0.1}
            initValue={trackSettings.danceability}
          />
          <Input
            category="Valence"
            lowLabel="Sombre"
            highLabel="Happy"
            min={0}
            max={1}
            step={0.1}
            initValue={trackSettings.valence}
          />
          <Input
            category="Acousticness"
            lowLabel="Digital"
            highLabel="Analog"
            min={0}
            max={1}
            step={0.1}
            initValue={trackSettings.acousticness}
          />
        </>
      )}
    </div>
  );
}
