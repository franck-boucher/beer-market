const API_URL = "https://api.punkapi.com/v2";

export type BeerType = {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  food_pairing: string[];
  brewers_tips: string;
};

export async function getRandomBeer() {
  const response = await fetch(`${API_URL}/beers/random`);
  const beer: BeerType[] = await response.json();
  return beer[0];
}

export async function getBeerById(id: string) {
  const response = await fetch(`${API_URL}/beers/${id}`);
  const beer: BeerType[] = await response.json();
  return beer[0];
}

export async function getBeers(search?: string) {
  const response = await fetch(
    `${API_URL}/beers?per_page=10${search ? `&beer_name=${search}` : ""}`
  );
  const beers: BeerType[] = await response.json();
  return beers;
}
