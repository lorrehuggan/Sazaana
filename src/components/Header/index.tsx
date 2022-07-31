import React from 'react';
import Image from 'next/image';
import SpotifyLogo from '@/public/assets/spotify-icon.svg';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="r-width py-4 flex justify-between items-center">
      <span className="uppercase font-display text-2xl">Suzaana</span>
      <div className="flex items-center">
        <span className="text-sm">Connect Spotify</span>
        <span className="w-5 h-5 relative ml-1">
          <Image src={SpotifyLogo} layout="fill" />
        </span>
      </div>
    </div>
  );
};

export default Header;
