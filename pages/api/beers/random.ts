// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BeerType, getRandomBeer } from "../../../services/beerService";

type RandomBeers = [BeerType, BeerType];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RandomBeers>
) {
  const randomBeers = await Promise.all([getRandomBeer(), getRandomBeer()]);
  res.status(200).json(randomBeers);
}

export const fetchRandomBeers = async () => {
  const response = await fetch("/api/beers/random");
  const randomBeers: RandomBeers = await response.json();
  return randomBeers;
};
