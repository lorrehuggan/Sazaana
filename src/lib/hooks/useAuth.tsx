import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LOGIN_ENDPOINT, REFRESH_ENDPOINT } from "../api";
import { useAppDispatch } from "../Redux/hooks";
import { setLoadingState } from "../Redux/reducers/searchMode";
import { setUserState } from "../Redux/reducers/userReducer";
import { User } from "../types/User";

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

const refreshFetcher = async (refreshToken: string) => {
  const response = await fetch(`${REFRESH_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

export default function UseAuth() {
  const [code, setCode] = useState<string>("");
  const [access_token, setAccessToken] = useState<string | null>(null);
  const [refresh_token, setRefreshToken] = useState<string>("");
  const [expires_in, setExpiresIn] = useState<number>(0);
  const [signedIn, setSignedIn] = useState(false);
  const dispatch = useAppDispatch();

  const { data: userData, isError } = useQuery<User>(
    ["login", code],
    () => fetcher(code),
    {
      enabled: code?.length > 0,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  //get refresh token
  const { data: refresh } = useQuery(
    ["refresh", refresh_token],
    () => refreshFetcher(refresh_token),
    {
      enabled: refresh_token?.length > 1,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  const router = useRouter();
  // get code from route and remove

  useEffect(() => {
    if (router.query.code as string) {
      setSignedIn(true);
      dispatch(setLoadingState(true));
      setCode(router.query.code as string);
      router.push("/");
    }
  }, [router.query.code]);

  //set access token and refresh token from response

  useEffect(() => {
    //if (!refresh_token || !access_token) return;
    if (userData) {
      setAccessToken(userData.access_token);
      setExpiresIn(userData.expires_in);

      dispatch(setUserState(userData));

      const interval = setInterval(() => {
        setRefreshToken(userData.refresh_token);
      }, (expires_in - 60) * 1000);

      return () => clearInterval(interval);
    }
  }, [userData]);

  useEffect(() => {
    if (!expires_in || !access_token) return;
    setAccessToken(refresh.accessToken);
    setExpiresIn(refresh.expiresIn);
    return () => {};
  }, [refresh]);

  return { access_token, refresh_token, expires_in, userData };
}
