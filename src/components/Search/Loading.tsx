import * as React from "react";

export interface ILoadingProps {}

export default function Loading(props: ILoadingProps) {
  return (
    <div className="canvas-width mt-2 overflow-x-hidden">
      <div className="h-1 w-1/4 animate-loading rounded-lg bg-primary"></div>
    </div>
  );
}
