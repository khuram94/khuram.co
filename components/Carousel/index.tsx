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

type TCarouselProps = {
  items: TItem;
  width: number;
  height: number;
  margin: number;
};

export const Carousel = ({
  items,
  width = 300,
  height,
  margin = 75,
}: TCarouselProps) => {
  const itemRef = useRef<Array<HTMLDivElement>>([]);
  const controls = useAnimation();
  const cardControls = useAnimation();
  const x = useMotionValue(0);

  const [boundaries, setBoundaries] = useState<number[]>([]);
  const [range, setRange] = useState<Array<number>>([]);
  const [position, setPosition] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const lCardWidth = width * 1.2;
  const xsCardWidth = width * 0.7;

  const cardSizes = [xsCardWidth, width, lCardWidth, width, xsCardWidth];
  const cardSpace = width + margin * 2;

  const makeNegative = (array: number[]) => array.map((x) => x * -1);

  useEffect(() => {
    const bounds = items.map(
      (_, i) => ((itemRef.current?.[i].clientWidth || 0) + margin * 2) * i
    );

    const range: number[] = [cardSpace * 2, cardSpace, ...makeNegative(bounds)];
    const lastItemRange: number = range[range.length - 1];
    range.push(lastItemRange - cardSpace);
    range.push(lastItemRange - cardSpace * 2);
    console.log({ range });
    setRange(range);
    setBoundaries(bounds);
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

  const getRange = (from: number) => {
    const values = range.slice(from, from + 5);
    return values.length === 5 ? values : [0, 0, 0, 0, 0];
  };

  const cardSize = useTransform(
    x,
    // Map x from these values:
    getRange(activeItem),
    // Into these values:
    cardSizes
  );

  const leftCard = useTransform(
    x,
    // Map x from these values:
    getRange(activeItem - 1),
    // Into these values:
    cardSizes
  );

  const rightCard = useTransform(
    x,
    // Map x from these values:
    getRange(activeItem + 1),
    // Into these values:
    cardSizes
  );

  const leftCard2 = useTransform(
    x,
    // Map x from these values:
    getRange(activeItem - 2),
    // Into these values:
    cardSizes
  );

  const rightCard2 = useTransform(
    x,
    // Map x from these values:
    getRange(activeItem + 2),
    // Into these values:
    cardSizes
  );

  const leftCard3 = useTransform(
    x,
    // Map x from these values:
    getRange(activeItem - 3),
    // Into these values:
    cardSizes
  );

  const rightCard3 = useTransform(
    x,
    // Map x from these values:
    getRange(activeItem + 3),
    // Into these values:
    cardSizes
  );

  useMotionValueEvent(x, "change", (point) => {
    // itemRef.current.forEach((item) => {
    //   item.style.width = `${cardSize.get()}px`;
    //   item.style.height = `${cardSize.get()}px`;
    // });

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
