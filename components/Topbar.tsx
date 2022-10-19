import Link from "next/link";
import { IconShoppingCart } from "@tabler/icons";
import { styled } from "../stitches.config";
import { useCart } from "./CartContext";

const TopbarUi = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  "& .cart": {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
});

export default function Topbar() {
  const { numberOfItems } = useCart();
  return (
    <TopbarUi>
      <h1>
        <Link href="/">
          <a>Beer Market 🍺</a>
        </Link>
      </h1>

      <span className="cart">
        {numberOfItems && <span>{numberOfItems}</span>}
        <IconShoppingCart />
      </span>
    </TopbarUi>
  );
}
