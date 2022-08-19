import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LOGIN_ENDPOINT } from "../api";

export interface IUseAuthProps {
  code: string;
}

const fetcher = async (code: string) => {
  const response = await fetch(`${LOGIN_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

export default function UseAuth({ code }: IUseAuthProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const { data } = useQuery(["login", code], () => fetcher(code));
}
