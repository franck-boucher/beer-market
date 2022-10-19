// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getBeers } from "../../../services/beerService";

type Beers = Awaited<ReturnType<typeof getBeers>>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Beers>
) {
  const search = typeof req.query.search === "string" ? req.query.search : "";
  const beers = await getBeers(search);
  res.status(200).json(beers);
}

export const fetchBeers = async (search: string) => {
  const response = await fetch("/api/beers?search=" + search);
  const beers: Beers = await response.json();
  return beers;
};
