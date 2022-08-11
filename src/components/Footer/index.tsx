import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="border-neutral-300 canvas-width mx-auto flex h-8 items-center justify-between border-t-2 lg:mt-4 xl:h-12 ">
      <a href="https://lorrehuggan.com">
        <p className="text-xs transition-colors duration-200 ease-in-out hover:text-primary xl:text-base">
          Project by Lorre Huggan
        </p>
      </a>
      <a href="https://twitter.com/lorrehuggan">
        <p className="cursor-pointer text-xs transition-colors duration-200 ease-in-out hover:text-[#1D9BF0] xl:text-base">
          Follow Me On Twitter
        </p>
      </a>
    </footer>
  );
};

export default Footer;
