import { IconChevronLeft } from "@tabler/icons";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "../../components/Link";
import Page from "../../components/Page";
import { getBeerById } from "../../services/beerService";
import { css, styled } from "../../stitches.config";

interface ServerProps {
  beer: Awaited<ReturnType<typeof getBeerById>>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.beerId || Array.isArray(params.beerId)) {
    return { notFound: true };
  }
  const beer = await getBeerById(params.beerId);
  const props: ServerProps = { beer };
  return { props };
};

export default function BeerPage({ beer }: ServerProps) {
  return (
    <Page>
      <Link href="/">
        <span className={css({ display: "flex", alignItems: "center" })()}>
          <IconChevronLeft /> Back
        </span>
      </Link>

      <BeerPageUi>
        {beer.image_url && (
          <Image
            src={beer.image_url}
            alt={beer.name}
            width={175}
            height={200}
            layout="fixed"
          />
        )}
        <div>
          <h2>{beer.name}</h2>
          <p>{beer.first_brewed}</p>

          <h3>Description</h3>
          <p>{beer.description}</p>
        </div>
      </BeerPageUi>
    </Page>
  );
}

const BeerPageUi = styled("div", {
  display: "flex",
  gap: "2rem",
  "& h2": { margin: 0 },
  "& p": { color: "#3d5266" },
});
