import React from "react";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";

import { AlbumGrid } from "@/components";
import { authorize, getAlbum } from "@/helpers/google-drive";

const capitaliseFirstChar = (word: string | undefined) => {
  if (word) {
    const formattedWord = word
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return formattedWord;
  }
};

export default function Album({
  imageUrls,
  heading,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Khuram.co</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          height: "100%",
          background:
            "linear-gradient(0deg, rgba(0,0,0,1) 1%, rgba(29,29,29,1) 50%, rgba(0,0,0,1) 99%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="heading">{heading}</h1>
        <div className="divider" />
        <AlbumGrid imageUrls={imageUrls} />
      </main>
    </>
  );
}

type TParams = ParsedUrlQuery & { album?: string };

export const getStaticProps: GetStaticProps = async (context) => {
  const { album }: TParams = context.params as TParams;

  const folderName = capitaliseFirstChar(album);

  if (!folderName) {
    return {
      redirect: {
        destination: "/gallery",
        permanent: false,
      },
    };
  }

  const imageIds = await authorize()
    .then(async (authClient) => await getAlbum(authClient, folderName))
    .catch(console.error);

  const imageUrls = imageIds?.map(
    (img: any) => `https://drive.google.com/uc?export=view&id=${img.imgPath}`
  );

  if (imageUrls.length === 0) {
    return {
      redirect: {
        destination: "/gallery",
        permanent: false,
      },
    };
  }

  return {
    props: { imageUrls: imageUrls || [], heading: folderName },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};