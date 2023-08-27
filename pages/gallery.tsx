import Head from "next/head";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import { authorize, getGallery } from "@/helpers/google-drive";
import { Carousel } from "@/components/Carousel";
import { AnimatePresence, motion } from "framer-motion";

export default function Gallery({
  albums,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [mediaQuery, setMediaQuery] = useState<MediaQueryList>();
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 450px)");
    setMediaQuery(mediaQuery);
  }, []);

  return (
    <>
      <Head>
        <title>Gallery</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          height: "100dvh",
          background:
            "linear-gradient(0deg, rgba(0,0,0,1) 1%, rgba(29,29,29,1) 50%, rgba(0,0,0,1) 99%)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 className="heading">THE LENS. WORLDWIDE.</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {mediaQuery && (
            <Carousel items={albums} isMobile={mediaQuery.matches} />
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const albums = await authorize()
    .then(async (authClient) => await getGallery(authClient))
    .catch(console.error);
  return {
    props: { albums },
  };
};
