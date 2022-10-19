import { faker } from "@faker-js/faker";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BeerType } from "../services/beerService";
import { CartProvider } from "../components/CartContext";

export const mockBeer = (): BeerType => ({
  id: faker.datatype.number(),
  name: faker.random.word(),
  tagline: faker.random.words(),
  first_brewed: faker.random.word(),
  description: faker.commerce.productDescription(),
  image_url: faker.image.imageUrl(),
  food_pairing: [faker.random.word()],
  brewers_tips: faker.random.words(),
});

export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
};
