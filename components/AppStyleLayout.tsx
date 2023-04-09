import styled from "styled-components";
import Image from "next/image";

// box-shadow: 0 0 22px 0px darkgrey;
// border-radius: 10px;

const Tile = styled.div`
  display: flex;
  flex: 50%;
  width: 100%;
  height: 50%;
  background-color: ${(props) => props.color || "white"};
  justify-content: center;
  position: relative;

  @media (max-width: 500px) {
    flex: 100%;
    height: 200px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  // ${Tile} {
  //     background-color: red;
  // }
`;

export const AppStyleLayout = () => (
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
    <Tile color="#EFEFEF">
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
