import styled, { createGlobalStyle } from "styled-components";
// import { reset } from "styled-reset-advanced";
// import { Reset } from "styled-reset";

import MotionSlider from "./MotionSlider";

// const GlobalStyle = createGlobalStyle`
//   ${reset}
//   body { overflow-x: hidden; }
// `;

// const Test = styled(Reset)`
//   body {
//     overflow-x: hidden;
//   }
// `;

const Wrapper = styled.div``;

const Element = styled.div`
  width: 300px;
  height: 400px;
  background: tomato;
`;

export const Carousel = () => (
  <Wrapper>
    {/* <GlobalStyle /> */}
    {/* <Test /> */}
    <MotionSlider>
      {[...Array(10)].map((item, i) => (
        <Element
          key={i}
          //   style={{ opacity: Math.random() /*, width: random(200, 600)*/ }}
        >
          {i}
        </Element>
      ))}
    </MotionSlider>
  </Wrapper>
);
