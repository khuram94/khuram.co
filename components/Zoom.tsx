import styled from "styled-components";

export const Ting = styled.div`
  padding: 50px;
  background-color: green;
  transition: transform 0.2s; /* Animation */
  width: 200px;
  height: 200px;
  margin: 0 auto;

  &:hover {
    transform: scale(1.5);
  }
`;

export const Zoom = () => <Ting></Ting>;
