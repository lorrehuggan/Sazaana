import React from "react";

type Props = {
  children: React.ReactNode;
};

const Main = (props: Props) => {
  return <main className="min-h-[calc(100vh-3.5rem)]">{props.children}</main>;
};

export default Main;
