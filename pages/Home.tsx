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

  return (
    <>
      <Head>
        <title>Khuram.co</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Tile color="#44CBB2">
            <Image
              loading="eager"
              src="/dev-logo.png"
              alt="Dev stuff. Find out what I can do."
              fill
              style={{ objectFit: "contain" }}
            />
          </Tile>
          <Tile color="#F4D502">
            <Image
              loading="eager"
              src="/playlists-logo.png"
              alt="Playlists. All the vibes."
              fill
              style={{ objectFit: "contain" }}
            />
          </Tile>
          <Tile color="#EFEFEF" onClick={() => router.push("/gallery")}>
            <Image
              loading="eager"
              src="/photography-logo.png"
              alt="Lights. Camera. Action. Take a look through my lens."
              fill
              style={{ objectFit: "contain" }}
            />
          </Tile>
          <Tile color="#DC1A21">
            <Image
              loading="eager"
              src="/cooking-logo.png"
              alt="K's Cuisine. Or a recipe for disaster."
              fill
              style={{ objectFit: "contain" }}
            />
          </Tile>
        </Container>

        {/* <video src={"/logo.mp4"} autoPlay loop style={{ width: '500px', height: '500px' }} /> */}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
