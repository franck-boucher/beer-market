import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockBeer, TestWrapper } from "../helpers/testUtils";
import Beer from "../components/Beer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartContext } from "../components/CartContext";

const fakeBeer = mockBeer();

describe("Beer element", () => {
  const addToCart = jest.fn();
  const removeFromCart = jest.fn();

  beforeEach(() => {
    render(<Beer beer={fakeBeer} />, { wrapper: TestWrapper });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const CustomWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <CartContext.Provider
          value={{
            cart: [{ beerId: fakeBeer.id, quantity: 13 }],
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            clearCart: () => {},
            numberOfItems: 0,
            numberOfItem: () => 13,
          }}
        >
          {children}
        </CartContext.Provider>
      </QueryClientProvider>
    );
  };

  it("renders the beer", () => {
    const heading = screen.getByRole("heading", {
      name: fakeBeer.name,
    });
    expect(heading).toBeInTheDocument();
  });

  it("displays the number of this beer in the cart", async () => {
    cleanup();
    render(<Beer beer={fakeBeer} />, { wrapper: CustomWrapper });

    const cartNumber = screen.getByText("13");
    expect(cartNumber).toBeInTheDocument();
  });

  it("add/remove another beer", async () => {
    cleanup();
    render(<Beer beer={fakeBeer} />, { wrapper: CustomWrapper });

    const addButton = screen.getByRole("button", { name: /Add to cart/i });
    await userEvent.click(addButton);
    expect(addToCart).toHaveBeenCalledTimes(1);

    const removeButton = screen.getByRole("button", {
      name: /Remove from cart/i,
    });
    await userEvent.click(removeButton);
    expect(removeFromCart).toHaveBeenCalledTimes(1);
  });
});
