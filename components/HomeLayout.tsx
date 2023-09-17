import Image from "next/image";
import styled from "styled-components";
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

export const HomeLayout = () => {
  const router = useRouter();
  return (
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
      <Tile color="#F4D502" onClick={() => router.push("/music")}>
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
  );
};
