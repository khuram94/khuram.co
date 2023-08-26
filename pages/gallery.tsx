import Head from "next/head";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import { authorize, getAlbumCovers } from "@/helpers/google-drive";
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
          height: "100vh",
          background:
            "linear-gradient(0deg, rgba(0,0,0,1) 1%, rgba(29,29,29,1) 50%, rgba(0,0,0,1) 99%)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <text className="heading">THE LENS. WORLDWIDE.</text>
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
            // <AnimatePresence mode="popLayout">
            //   <motion.div
            //     initial="initialState"
            //     animate="animateState"
            //     exit="exitState"
            //     variants={{
            //       initialState: {
            //         x: "100vw",
            //       },
            //       animateState: {
            //         transition: { duration: 1.5, delay: 2 },
            //         x: 0,
            //       },
            //     }}
            //     style={{
            //       display: "flex",
            //       flexDirection: "column",
            //       height: "100%",
            //     }}
            //   >
            <Carousel items={albums} isMobile={mediaQuery.matches} />
            //   </motion.div>
            // </AnimatePresence>
          )}
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
