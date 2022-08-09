import Image from "next/image";
import * as React from "react";

export interface IUserSearchProps {
  title: string;
  image: string;
}

export default function UserSearch({ title, image }: IUserSearchProps) {
  return (
    <div className="flex space-x-2">
      <div className="relative h-7 w-7">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <p>{title}</p>
    </div>
  );
}
