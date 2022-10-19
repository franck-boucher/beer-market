import React from "react";

export interface CartItem {
  beerId: number;
  quantity: number;
}

export interface CartContextValues {
  cart: CartItem[];
  addToCart: (beerId: number) => void;
  removeFromCart: (beerId: number) => void;
  clearCart: () => void;
  numberOfItems: number;
  numberOfItem: (beerId: number) => number;
}

export const CartContext = React.createContext<CartContextValues | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = React.useState<CartItem[]>([]);

  const addToCart = (beerId: number) => {
    setCart((cart) => {
      const item = cart.find((item) => item.beerId === beerId);
      if (item) {
        return cart.map((item) =>
          item.beerId === beerId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...cart, { beerId, quantity: 1 }];
    });
  };

  const removeFromCart = (beerId: number) => {
    setCart((cart) => {
      const item = cart.find((item) => item.beerId === beerId);
      if (!item) return cart;
      if (item.quantity === 1) {
        return cart.filter((item) => item.beerId !== beerId);
      }
      return cart.map((item) =>
        item.beerId === beerId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const clearCart = () => setCart([]);

  const cartContextValue = React.useMemo(() => {
    const numberOfItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const numberOfItem = (beerId: number) => {
      const item = cart.find((item) => item.beerId === beerId);
      return item?.quantity || 0;
    };

    return {
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      numberOfItems,
      numberOfItem,
    };
  }, [cart]);

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
