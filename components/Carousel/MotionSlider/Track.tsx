import { useContext, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { useWindowSize } from "../../../hooks/use-window-size";
import { useDimensions } from "./use-dimensions";

import { Context } from "./Context";

const Wrapper = styled.div`
  width: 100%;
`;

const StyledTrack: any = styled(motion.div)`
  display: flex;
  flex-wrap: nowrap;
  min-width: min-content;
  padding: ${(props: any) => props.padding}px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const Track = ({ children, padding, velocity, transition }: any) => {
  const [actualPoint, setActualPoint] = useState<number>(0);
  const [trackRef, trackDimensions] = useDimensions();
  const windowDimensions = useWindowSize();
  const controls = useAnimation();

  const { state, dispatch } = useContext(Context);
  const negativeItems = state.items.map(
    (item: any) => item * -1 + trackDimensions.x || 0
  );

  function onDragEnd(event: any, info: PanInfo) {
    // info offset x = how many pixels we have moved by (- left to right / + right to left)
    // info point x = position of cursor on release
    // info velocity x = how fast we are moving the cursor

    let pointToUse;

    if (actualPoint === 0) {
      pointToUse = info.offset.x;
    } else {
      pointToUse = actualPoint + info.offset.x;
    }

    console.log({ pointToUse });

    console.log({ info });
    const offset = info.offset.x;
    const point = info.point.x;
    const actualVelocity = info.velocity.x;
    // console.log({ point, offset });

    // const correctedVelocity = info.velocity.x * velocity;
    // console.log({ actualVelocity, correctedVelocity });

    // e.g. -1500 * 0.4 = -600 (moving left to right)
    // e.g. 1500 * 0.4 = 600   (moving right to left)

    // const direction = correctedVelocity < 0 || offset < 0 ? 1 : -1;
    const direction = offset < 0 ? 1 : -1;
    // direction = 1 (left to right) OR -1 (right to left)
    const startPosition = pointToUse - offset;

    // const endOffset =
    //   direction === 1
    //     ? Math.min(correctedVelocity, offset)
    //     : Math.max(correctedVelocity, offset);
    const endOffset = offset;

    const endPosition = startPosition + endOffset;
    // console.log({ negativeItems });
    // console.log({ endPosition, startPosition, endOffset });

    const closestPosition = negativeItems.reduce((prev: any, curr: any) =>
      Math.abs(curr - endPosition) < Math.abs(prev - endPosition) ? curr : prev
    );
    // console.log({ closestPosition });

    const activeSlide = negativeItems.indexOf(closestPosition);
    dispatch({ type: "SET_ACTIVE_ITEM", activeItem: activeSlide });

    // end position is the pixel at which the cursor is released when dragging
    // e.g. start is 0, mid screen is around 500 pixel, end screen is around 1000

    // console.log({ closestPosition, endPosition, info });

    console.log(
      "window width: ",
      windowDimensions.width,
      " track width: ",
      trackDimensions.width,
      " track x: ",
      trackDimensions.x
    );

    controls.start({
      x: Math.max(
        closestPosition,
        // -1660,
        windowDimensions.width - trackDimensions.width - trackDimensions.x || 0
        // -1700
      ),
      transition: { type: "enertia" },
    });

    setActualPoint(pointToUse);
  }

  const left =
    windowDimensions.width - trackDimensions.width - trackDimensions.x;
  const right = 0 + trackDimensions.x;
  // console.log({ left, right });

  return (
    <Wrapper>
      <StyledTrack
        ref={trackRef}
        padding={padding}
        animate={controls}
        drag="x"
        dragConstraints={{
          left,
          right,
        }}
        // dragSnapToOrigin
        // whileDrag={{ scale: 1.05 }}
        onDragEnd={onDragEnd}
      >
        {children}
      </StyledTrack>
    </Wrapper>
  );
};

export default Track;
