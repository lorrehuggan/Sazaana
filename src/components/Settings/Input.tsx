import * as React from "react";
import { useAppDispatch } from "@/lib/Redux/hooks";
import { setTrackSettingsState } from "@/lib/Redux/reducers/trackSettingsReducer";
import { useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";

export interface IInputProps {
  category: string;
  lowLabel: string;
  highLabel: string;
  step: number;
  min: number;
  max: number;
  initValue: number;
}

export default function Input({
  category,
  lowLabel,
  highLabel,
  step,
  min,
  max,
  initValue,
}: IInputProps) {
  const [value, setValue] = React.useState(initValue);
  const dispatch = useAppDispatch();
  const trackState = useAppSelector(
    (state: RootState) => state.trackSettingsState
  );

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (category) {
      case "Popularity":
        setValue(Number(e.target.value));
        dispatch(
          setTrackSettingsState({
            ...trackState,
            popularity: Number(e.target.value),
          })
        );

        break;
      case "Energy":
        setValue(Number(e.target.value));
        dispatch(
          setTrackSettingsState({
            ...trackState,
            energy: Number(e.target.value),
          })
        );

        break;
      case "Tempo":
        setValue(Number(e.target.value));
        dispatch(
          setTrackSettingsState({
            ...trackState,
            tempo: Number(e.target.value),
          })
        );

        break;
      case "Dance-ability":
        setValue(Number(e.target.value));
        dispatch(
          setTrackSettingsState({
            ...trackState,
            danceability: Number(e.target.value),
          })
        );

        break;
      case "Valence":
        setValue(Number(e.target.value));
        dispatch(
          setTrackSettingsState({
            ...trackState,
            valence: Number(e.target.value),
          })
        );

        break;
      case "Acousticness":
        setValue(Number(e.target.value));
        dispatch(
          setTrackSettingsState({
            ...trackState,
            acousticness: Number(e.target.value),
          })
        );

        break;

      default:
        break;
    }
  };
  return (
    <div className="mt-2 border-b border-white/20 py-2">
      <p className="mb-1 text-xs uppercase text-primary">{category}</p>
      <input
        onChange={(e) => update(e)}
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        className="range range-primary range-xs my-1"
      />
      <div className="flex w-full justify-between">
        <p className="text-xs">{lowLabel}</p>
        <p className="text-xs">{highLabel}</p>
      </div>
    </div>
  );
}
