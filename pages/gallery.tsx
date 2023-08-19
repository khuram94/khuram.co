import Head from "next/head";
import { Inter } from "next/font/google";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import { authorize, getAlbumCovers } from "@/helpers/google-drive";
import { Carousel } from "@/components/Carousel";

import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  albums,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Gallery</title>
        <meta name="Khuram.co. Gallery." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          height: "100vh",
          background: "#1D1D1D",
        }}
      >
        <text className="heading">KHURAM.CO. GALLERY.</text>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Carousel items={albums} />
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const albums = await authorize()
    .then(async (authClient) => await getAlbumCovers(authClient))
    .catch(console.error);
  return {
    props: { albums },
  };
};
