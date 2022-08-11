import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="r-width border-neutral-300 flex h-8 items-center justify-between border-t-2 lg:mt-4">
      <p className="text-xs">Project by Lorre Huggan</p>
      <a href="https://twitter.com/lorrehuggan">
        <p className="cursor-pointer text-xs transition-colors duration-200 ease-in-out hover:text-[#1D9BF0]">
          Follow Me On Twitter
        </p>
      </a>
    </footer>
  );
};

export default Footer;
