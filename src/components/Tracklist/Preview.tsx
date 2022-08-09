import { Main } from "@/lib/types/mainSearch";
import * as React from "react";

export interface IPreviewProps {
  track: Main;
}

export default function Preview({ track }: IPreviewProps) {
  return (
    <>
      {track.data.preview_url && (
        <div className="w-12 text-xs">
          <p>Preview</p>
          <progress
            className="progress progress-primary h-1 w-full items-center"
            value="20"
            max="100"
          ></progress>
        </div>
      )}
    </>
  );
}
