import type { NextApiRequest, NextApiResponse } from "next";
import { spotifyApi } from "../middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ test: "test" });
}
