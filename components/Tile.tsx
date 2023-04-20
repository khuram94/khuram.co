import styled from "styled-components";

export const Tile = styled.div`
  display: flex;
  flex: 45%;
  width: 100%;
  height: 47%;
  background-color: ${(props) => props.color || "white"};
  justify-content: center;
  position: relative;
  margin: 10px;
  box-shadow: 0 0 22px 0px darkgrey;
  border-radius: 10px;

  @media (max-width: 500px) {
    flex: 100%;
    height: 40%;
  }
`;
