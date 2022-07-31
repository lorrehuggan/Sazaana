import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Main = (props: Props) => {
  return <main>{props.children}</main>;
};

export default Main;
