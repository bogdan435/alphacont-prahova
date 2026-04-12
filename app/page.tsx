import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const SITE_URL = "https://contabilprahova.ro";
const BRAND = "ALPHACONT GROUP";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Expert contabil Prahova | Contabilitate firme și PFA";
  const description =
    "Servicii de contabilitate în Prahova pentru SRL și PFA: contabilitate completă, salarizare, declarații fiscale și suport ANAF.";

  return {
    title,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      url: SITE_URL,
      title: `${title} | ${BRAND}`,
      description,
      images: [
        {
          url: "/office-main.jpg",
          width: 1200,
          height: 630,
          alt: "Expert contabil Prahova - ALPHACONT GROUP",
        },
      ],
    },
    twitter: {
      title: `${title} | ${BRAND}`,
      description,
      images: ["/office-main.jpg"],
    },
  };
}

export default function Page() {
  return <HomeClient />;
}