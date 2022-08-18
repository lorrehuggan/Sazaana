import { setTrackSettingsState } from "@/lib/Redux/reducers/trackSettingsReducer";
import { RootState } from "@/lib/Redux/store";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../lib/Redux/hooks";

export interface INumberOfTracksProps {}

export default function NumberOfTracks(props: INumberOfTracksProps) {
  const dispatch = useAppDispatch();
  const trackState = useAppSelector(
    (state: RootState) => state.trackSettingsState
  );

  const update = (num: number) => {
    dispatch(
      setTrackSettingsState({
        ...trackState,
        maxNumOfTracks: num,
      })
    );
    return;
  };
  const handleMaxTracks = (num: number) => {
    switch (num) {
      case 10:
        update(10);
        break;
      case 20:
        update(20);
        break;
      case 30:
        update(30);
        break;
      case 40:
        update(40);
        break;
      case 50:
        update(50);
        break;

      default:
        break;
    }
  };

  return (
    <div className="mt-4 border-b-[1px] py-1">
      <select className=" w-full bg-base-100 p-0 text-xs">
        <option disabled selected>
          Max Number Of Tracks
        </option>
        <option onClick={() => handleMaxTracks(10)}>10</option>
        <option onClick={() => handleMaxTracks(20)}>20</option>
        <option onClick={() => handleMaxTracks(30)}>30</option>
        <option onClick={() => handleMaxTracks(40)}>40</option>
        <option onClick={() => handleMaxTracks(50)}>50</option>
      </select>
    </div>
  );
}
