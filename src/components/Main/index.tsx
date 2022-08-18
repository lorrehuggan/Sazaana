import React from "react";

type Props = {
  children: React.ReactNode;
};

const Main = (props: Props) => {
  return (
    <main className="min-h-[calc(100vh-7rem)] xl:min-h-[calc(100vh-9rem)]">
      {props.children}
    </main>
  );
};

export default Main;
