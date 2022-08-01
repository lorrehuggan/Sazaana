import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="r-width flex h-8 items-center justify-between border-t-2 border-neutral-300">
      <p className="text-xs">Project by Lorre Huggan</p>
      <a href="https://twitter.com/lorrehuggan">
        <p className="cursor-pointer text-xs transition-colors duration-200 ease-in-out hover:text-[#1D9BF0]">
          Twitter
        </p>
      </a>
    </footer>
  );
};

export default Footer;
