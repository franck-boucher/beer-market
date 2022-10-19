import { IconMinus, IconPlus } from "@tabler/icons";
import Image from "next/image";
import { BeerType } from "../services/beerService";
import { styled } from "../stitches.config";
import Button from "./Button";
import { useCart } from "./CartContext";
import Link from "./Link";
import { motion, Variants } from "framer-motion";

const fadeIn: Variants = {
  initial: {
    x: 30,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const BeerUi = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  border: "1px solid #ccc",
  margin: "0.5rem",
  borderRadius: "0.25rem",
  "& .beer-section": {
    display: "flex",
    gap: "1rem",
    "& h3": {
      marginTop: 0,
      marginBottom: "0.5rem",
    },
    "& p": {
      color: "#3d5266",
      margin: 0,
    },
  },
  "& .actions": {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",

    "& .quantity": {
      fontSize: "1.2rem",
    },
  },
});

export interface BeerProps {
  beer: BeerType;
}

export default function Beer({ beer }: BeerProps) {
  const { numberOfItem, addToCart, removeFromCart } = useCart();
  const quatityInCart = numberOfItem(beer.id);

  const preventLink =
    (action: (...args: any[]) => void) => (e: React.MouseEvent) => {
      e.preventDefault();
      action();
    };

  return (
    <Link href={`/beers/${beer.id}`}>
      <motion.div variants={fadeIn}>
        <BeerUi>
          <div className="beer-section">
            {beer.image_url && (
              <Image
                src={beer.image_url}
                alt={beer.name}
                width={20}
                height={60}
              />
            )}
            <div>
              <h3>{beer.name}</h3>
              <p>{beer.first_brewed}</p>
            </div>
          </div>
          <div className="actions">
            {quatityInCart > 0 && (
              <>
                <Button
                  onClick={preventLink(() => removeFromCart(beer.id))}
                  aria-label="Remove from cart"
                >
                  <IconMinus />
                </Button>
                <span className="quantity">{quatityInCart}</span>
              </>
            )}
            <Button
              onClick={preventLink(() => addToCart(beer.id))}
              aria-label="Add to cart"
            >
              <IconPlus />
            </Button>
          </div>
        </BeerUi>
      </motion.div>
    </Link>
  );
}
