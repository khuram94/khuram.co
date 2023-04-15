import { useRef, useEffect, useState } from "react";
import { PanInfo, motion, useAnimation } from "framer-motion";

const items = [...Array(5)];

export const Carousel = () => {
  const itemRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const [boundaries, setBoundaries] = useState<number[]>([]);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setBoundaries(
      items.map((_, i) => ((itemRef.current?.clientWidth || 0) + 150) * i)
    );
  }, []);

  const dragEnd = (_: any, info: PanInfo) => {
    const endPosition = position - info.offset.x;

    const closestPosition = boundaries?.reduce((prev: any, curr: any) =>
      Math.abs(curr - endPosition) < Math.abs(prev - endPosition) ? curr : prev
    );

    controls.start({
      x: -closestPosition,
      transition: { type: "tween", duration: 0.5 },
    });

    setPosition(closestPosition);
  };

  return (
    <motion.div className="carousel">
      <motion.div
        className="inner-carousel"
        drag="x"
        dragConstraints={{ right: 0, left: -boundaries[boundaries.length - 1] }}
        whileDrag={{ cursor: "grabbing" }}
        onDragEnd={dragEnd}
        animate={controls}
      >
        {items.map((_, i) => (
          <motion.div
            className="item"
            key={i}
            ref={itemRef}
            style={{
              background: "orange",
              height: "100%",
              borderRadius: "3rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 100,
            }}
          >
            {i}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
