import { render, screen } from "@testing-library/react";
import Home, { ServerProps as HomeServerProps } from "../pages";
import { mockBeer, TestWrapper } from "../helpers/testUtils";

const mockData: HomeServerProps = {
  beerStore: [mockBeer(), mockBeer(), mockBeer()],
  randomBeers: [mockBeer(), mockBeer()],
};

describe("Home", () => {
  beforeEach(() => {
    render(<Home {...mockData} />, { wrapper: TestWrapper });
  });

  it("renders headings", () => {
    const heading = screen.getByRole("heading", {
      name: /Beers of the moment/i,
    });
    expect(heading).toBeInTheDocument();

    const heading2 = screen.getByRole("heading", { name: /Beer Store/i });
    expect(heading2).toBeInTheDocument();
  });
});
