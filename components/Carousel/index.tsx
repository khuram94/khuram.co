import { useRef, useEffect, useState } from "react";
import {
  PanInfo,
  motion,
  useTransform,
  useAnimation,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";

import Image from "next/image";

type TItem = [{ imgPath: string; alt: string; colourScheme: string }];

export const Carousel = ({ items }: { items: TItem }) => {
  const itemRef = useRef<Array<HTMLDivElement>>([]);
  const controls = useAnimation();
  const cardControls = useAnimation();
  const x = useMotionValue(0);

  const [boundaries, setBoundaries] = useState<number[]>([]);
  const [position, setPosition] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  const zoomScale = [250, 300, 350, 300, 250];

  console.log({ activeItem });

  useEffect(() => {
    setBoundaries(
      items.map((_, i) => ((itemRef.current?.[i].clientWidth || 0) + 150) * i)
    );
  }, []);

  const dragEnd = (_: any, info: PanInfo) => {
    const endPosition = position - info.offset.x;

    const closestPosition = boundaries?.reduce((prev: any, curr: any) =>
      Math.abs(curr - endPosition) < Math.abs(prev - endPosition) ? curr : prev
    );

    controls.start({
      x: -closestPosition,
      transition: { type: "tween", duration: 0.5, velocity: 10 },
    });

    setPosition(closestPosition);
    setActiveItem(boundaries.indexOf(closestPosition));
  };

  const scales = [
    [900, 450, 0, -450, -900],
    [450, 0, -450, -900, -1350],
    [0, -450, -900, -1350, -1800],
    [-450, -900, -1350, -1800, -2250],
  ];

  const cardSize = useTransform(
    x,
    // Map x from these values:
    scales[activeItem],
    // Into these values:
    zoomScale
  );

  const getLeftScale = () =>
    activeItem > 0 ? scales[activeItem - 1] : [0, 0, 0, 0, 0];

  const getLeftScale2 = () =>
    activeItem > 1 ? scales[activeItem - 2] : [0, 0, 0, 0, 0];

  const getLeftScale3 = () =>
    activeItem > 2 ? scales[activeItem - 3] : [0, 0, 0, 0, 0];

  const getRightScale = () =>
    activeItem < items.length - 1 ? scales[activeItem + 1] : [0, 0, 0, 0, 0];

  const getRightScale2 = () =>
    activeItem < items.length - 2 ? scales[activeItem + 2] : [0, 0, 0, 0, 0];

  const getRightScale3 = () =>
    activeItem < items.length - 3 ? scales[activeItem + 3] : [0, 0, 0, 0, 0];

  const leftCard = useTransform(
    x,
    // Map x from these values:
    getLeftScale(),
    // Into these values:
    zoomScale
  );

  const rightCard = useTransform(
    x,
    // Map x from these values:
    getRightScale(),
    // Into these values:
    zoomScale
  );

  const leftCard2 = useTransform(
    x,
    // Map x from these values:
    getLeftScale2(),
    // Into these values:
    zoomScale
  );

  const rightCard2 = useTransform(
    x,
    // Map x from these values:
    getRightScale2(),
    // Into these values:
    zoomScale
  );

  const leftCard3 = useTransform(
    x,
    // Map x from these values:
    getLeftScale3(),
    // Into these values:
    zoomScale
  );

  const rightCard3 = useTransform(
    x,
    // Map x from these values:
    getRightScale3(),
    // Into these values:
    zoomScale
  );

  const margin = useTransform(
    x,
    // Map x from these values:
    scales[activeItem],
    // Into these values:
    [25, 50, 150, 50, 25]
  );

  useMotionValueEvent(x, "change", (point) => {
    itemRef.current[activeItem].style.width = `${cardSize.get()}px`;
    itemRef.current[activeItem].style.height = `${cardSize.get()}px`;

    // itemRef.current[activeItem].style.marginRight = `${marginRight.get()}px`;

    if (activeItem > 0) {
      itemRef.current[activeItem - 1].style.width = `${leftCard.get()}px`;
      itemRef.current[activeItem - 1].style.height = `${leftCard.get()}px`;
    }

    if (activeItem > 1) {
      itemRef.current[activeItem - 2].style.width = `${leftCard2.get()}px`;
      itemRef.current[activeItem - 2].style.height = `${leftCard2.get()}px`;
    }

    if (activeItem > 2) {
      itemRef.current[activeItem - 3].style.width = `${leftCard3.get()}px`;
      itemRef.current[activeItem - 3].style.height = `${leftCard3.get()}px`;
    }

    if (activeItem < items.length - 1) {
      itemRef.current[activeItem + 1].style.width = `${rightCard.get()}px`;
      itemRef.current[activeItem + 1].style.height = `${rightCard.get()}px`;
    }

    if (activeItem < items.length - 2) {
      itemRef.current[activeItem + 2].style.width = `${rightCard2.get()}px`;
      itemRef.current[activeItem + 2].style.height = `${rightCard2.get()}px`;
    }

    if (activeItem < items.length - 3) {
      itemRef.current[activeItem + 3].style.width = `${rightCard3.get()}px`;
      itemRef.current[activeItem + 3].style.height = `${rightCard3.get()}px`;
    }
  });

  return (
    <motion.div className="carousel">
      <motion.div
        className="inner-carousel"
        drag="x"
        dragConstraints={{ right: 0, left: -boundaries[boundaries.length - 1] }}
        whileDrag={{ cursor: "grabbing" }}
        onDragEnd={dragEnd}
        animate={controls}
        style={{ x }}
      >
        {items.map((item, i) => (
          <div className="item">
            <motion.div
              key={i}
              ref={(el) => el && (itemRef.current[i] = el)}
              style={{ background: item.colourScheme }}
              animate={cardControls}
            >
              <Image
                loading="eager"
                src={item.imgPath}
                alt={item.alt}
                style={{ position: "relative" }}
                width={350}
                height={350}
              />
              {/* {i} */}
            </motion.div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};
