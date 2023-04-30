import React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import styled from "styled-components";
import { authorize, getImageUrls } from "../helpers/google-drive";
import { AppStyleLayout } from "../components/AppStyleLayout";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
const inter = Inter({ subsets: ["latin"] });

export default function Home({
  imageIds,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log({ imageIds });
  const items = [
    { imgPath: imageIds[3] },
    { imgPath: imageIds[4] },
    { imgPath: imageIds[5] },
    { imgPath: imageIds[0] },
    { imgPath: imageIds[1] },
    { imgPath: imageIds[2] },
  ];

  return (
    <>
      <Head>
        <title>Khuram.co</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,100&display=swap');
        </style> */}
      </Head>
      <main
        style={{
          height: "100vh",
          background: "#1D1D1D",
          // background:
          //   "linear-gradient(90deg, rgba(142,45,226,1) 25%, rgba(74,0,224,1) 75%)",
          // background:
          //   "linear-gradient(90deg, rgba(15,32,39,1) 0%, rgba(32,58,67,1) 35%, rgba(44,83,100,1) 100%)",
        }}
      >
        {/* <AppStyleLayout />
        <Zoom /> */}
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); clip-path:
        polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
        <motion.div
          transition={{ duration: 2 }}
          style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}
          initial={{
            opacity: 0,
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
          }}
          animate={{
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
          exit={{ opacity: 0 }}
        >
          <span style={{ fontSize: "50px" }}>heyo</span>
        </motion.div>
        {/* <AnimatePresence>
          <text className="heading">PLAY. EXPLORE. CREATE. INSPIRE.</text>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            hello
          </div>
        </AnimatePresence> */}
        {/* <video src={"/logo.mp4"} autoPlay loop style={{ width: '500px', height: '500px' }} /> */}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  // check query param for which images to fetch i.e. tokyo

  // fetch images from google drive
  //   const imageIds = await authorize()
  //     .then(async (authClient) => await getImageUrls(authClient))
  //     .catch(console.error);

  return {
    props: { imageIds: [] },
  };
};
