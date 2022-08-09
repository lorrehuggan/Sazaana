import * as React from "react";

export interface ILoadingProps {}

export default function Loading(props: ILoadingProps) {
  return (
    <div className="r-width mt-1 overflow-x-hidden">
      <div className="h-1 w-1/4 animate-loading rounded-lg bg-white"></div>
    </div>
  );
}
