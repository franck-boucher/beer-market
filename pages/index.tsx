import { useState } from "react";
import { getBeers, getRandomBeer } from "../services/beerService";
import { fetchRandomBeers } from "./api/beers/random";
import { fetchBeers } from "./api/beers";
import Beer from "../components/Beer";
import { styled } from "../stitches.config";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "../helpers/hooks";
import Page from "../components/Page";
import { motion, Variants } from "framer-motion";

export interface ServerProps {
  randomBeers: Awaited<ReturnType<typeof getRandomBeer>>[];
  beerStore: Awaited<ReturnType<typeof getBeers>>;
}

export async function getServerSideProps() {
  const [randomBeer1, randomBeer2, beerStore] = await Promise.all([
    getRandomBeer(),
    getRandomBeer(),
    getBeers(),
  ]);
  const props: ServerProps = {
    randomBeers: [randomBeer1, randomBeer2],
    beerStore,
  };
  return { props };
}

export default function Home(props: ServerProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);

  const { data: beerStore } = useQuery(
    ["beerStore", debouncedSearch],
    () => fetchBeers(debouncedSearch),
    { initialData: props.beerStore }
  );

  const { data: randomBeers } = useQuery(["randomBeers"], fetchRandomBeers, {
    initialData: props.randomBeers,
    refetchInterval: 10000,
    staleTime: 10000,
  });

  return (
    <Page>
      <h2>Beers of the moment 👌</h2>
      {randomBeers.map((beer) => (
        <Beer key={beer.id} beer={beer} />
      ))}

      <h2>Beer Store 🍻</h2>
      <BeerStoreUi>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a beer"
        />
        <motion.div className="beer-list" variants={stagger}>
          {beerStore.map((beer) => (
            <div key={beer.id} className="beer-item">
              <Beer beer={beer} />
            </div>
          ))}
        </motion.div>
      </BeerStoreUi>
    </Page>
  );
}

const BeerStoreUi = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  '& input[type="text"]': {
    padding: "0.5rem",
    margin: "0.5rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "0.25rem",
  },

  "& .beer-list": {
    display: "flex",
    flexWrap: "wrap",
    columns: 2,

    "& .beer-item": {
      flexBasis: "50%",
    },
  },
});

const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};
