import Head from "next/head";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import { Carousel } from "@/components/Carousel";
import { getAlbum } from "@/utils/content/get-images";
import { TAlbum } from "@/types/album";

export default function Gallery({
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [mediaQuery, setMediaQuery] = useState<MediaQueryList>();
  const [xsMobile, setXsMobile] = useState<MediaQueryList>();
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 450px)");
    const xsMobile = window.matchMedia("(max-width: 370px)");
    setMediaQuery(mediaQuery);
    setXsMobile(xsMobile);
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
        <div
          style={{
            display: "flex",
            width: "fit-content",
            alignSelf: "center",
            marginTop: "30px",
          }}
        >
          {xsMobile?.matches ? (
            <span className="heading easeIn">THE LENS. WORLDWIDE.</span>
          ) : (
            <p className="line-1 anim-typewriter">THE LENS. WORLDWIDE.</p>
          )}
        </div>
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
            <Carousel items={images} isMobile={mediaQuery.matches} />
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { photos } = (await getAlbum("gallery")) as TAlbum;
  return {
    props: { images: photos },
  };
};
