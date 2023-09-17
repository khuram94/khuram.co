import { useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";

import Image from "next/image";
import { useRouter } from "next/router";

const Tile = styled.div`
  display: flex;
  flex: 50%;
  width: 100%;
  height: 50%;
  background-color: ${(props) => props.color || "white"};
  justify-content: center;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;

  @media (min-width: 450px) {
    flex-flow: row wrap;
  }
`;

export default function App({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  const router = useRouter();

  useEffect(() => {
    router.push("/gallery");
  }, [router]);
  return (
    <>
      <Head>
        <title>Khuram.co</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100dvh",
            background:
              "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(29, 29, 29, 1) 50%, rgba(0, 0, 0, 1) 100%)",
            alignItems: "center",
          }}
        >
          {/* <p className="line-1 anim-typewriter-home">
            Khuram.co. More to come.
          </p> */}
        </div>
        <video
          src={"/logo.mp4"}
          autoPlay
          loop
          style={{ width: "500px", height: "500px" }}
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
