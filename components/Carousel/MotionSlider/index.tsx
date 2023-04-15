import React from "react";

import { ContextProvider } from "./Context";
import Track from "./Track";
import Item from "./Item";

const MotionSlider = ({
  children,
  padding,
  gap,
  velocity,
  transition,
}: any) => {
  return (
    <ContextProvider>
      <Track padding={padding} velocity={velocity} transition={transition}>
        {children.map((child: any, i: number) => (
          <Item key={i} gap={gap} padding={padding}>
            {child}
          </Item>
        ))}
      </Track>
    </ContextProvider>
  );
};

MotionSlider.defaultProps = {
  padding: 40,
  gap: 40,
  velocity: 0.4,
  transition: { type: "spring" },
};

export default MotionSlider;
