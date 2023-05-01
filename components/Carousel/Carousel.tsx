import { useRef, useEffect, useState } from "react";
import { PanInfo, motion, useAnimation, useMotionValue } from "framer-motion";

import Image from "next/image";

import { Item } from "./Item";
import { Tabs } from "./Tabs";

type TItem = [{ imgPath: string; alt: string; colourScheme: string }];

type TCarouselProps = {
  items: TItem;
  width: number;
  height: number;
  margin: number;
};

export const Carousel = ({
  items,
  width = 420,
  height = 650,
  margin = 100,
}: TCarouselProps) => {
  const itemRef = useRef<Array<HTMLDivElement>>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);

  const [boundaries, setBoundaries] = useState<number[]>([]);
  const [range, setRange] = useState<Array<number>>([]);
  const [activeItem, setActiveItem] = useState(0);

  const sWidth = width * 0.8;
  const xsWidth = width * 0.5;
  const sHeight = height * 0.8;
  const xsHeight = height * 0.5;
  const sMargin = margin * 0.95;
  const xsMargin = margin * 0.85;

  const cardWidths = [xsWidth, sWidth, width, sWidth, xsWidth];
  const cardHeights = [xsHeight, sHeight, height, sHeight, xsHeight];
  const margins = [xsMargin, sMargin, margin, sMargin, xsMargin];
  const cardSpace = width + margin * 2;

  const makeNegative = (array: number[]) => array.map((x) => x * -1);

  const innerCarouselMarginLeft =
    (carouselRef?.current?.clientWidth || 0) / 2 - 285;

  //   margin-left: calc(50% - 285px);

  const makeRange = (bounds: number[]) => {
    const range: number[] = [cardSpace * 2, cardSpace, ...makeNegative(bounds)];
    const lastItemRange: number = range[range.length - 1];
    range.push(lastItemRange - cardSpace);
    range.push(lastItemRange - cardSpace * 2);
    return range;
  };

  const initialsizes = [sWidth, xsWidth, xsWidth, xsWidth, xsWidth];
  const initialMargins = [sMargin, xsMargin, xsMargin, xsMargin, xsMargin];

  useEffect(() => {
    const bounds = initialsizes.reduce(
      (pV, cV, cI) => {
        const bound =
          initialsizes[cI] + initialMargins[cI] * 2 + pV[pV.length - 1];
        pV.push(bound);
        return pV;
      },
      [0]
    );

    const range = makeRange(bounds);
    setRange(range);
    setBoundaries(bounds);
  }, []);

  const dragEnd = (_: any, info: PanInfo) => {
    console.log("drag end");
    const endPosition = boundaries[activeItem] - info.offset.x;

    const closestPosition = boundaries?.reduce((prev: any, curr: any) =>
      Math.abs(curr - endPosition) < Math.abs(prev - endPosition) ? curr : prev
    );

    controls.start({
      x: -closestPosition,
      transition: { type: "tween", duration: 0.5, velocity: 10 },
    });

    setActiveItem(boundaries.indexOf(closestPosition));
  };

  // on tab selection
  useEffect(() => {
    controls.start({
      x: -boundaries[activeItem],
      transition: { type: "tween", duration: 0.5, velocity: 10 },
    });
  }, [activeItem]);

  return (
    <div style={{ width: "100%" }}>
      <motion.div
        className="carousel"
        style={{ height, marginBottom: "50px" }}
        ref={carouselRef}
        exit={{ opacity: 0, transition: { duration: 20 } }}
        key="some-key"
      >
        <motion.div
          className="inner-carousel"
          drag="x"
          dragConstraints={{
            right: 0,
            left: -boundaries[boundaries.length - 1],
          }}
          whileDrag={{ cursor: "grabbing" }}
          onDragEnd={dragEnd}
          animate={controls}
          style={{ x, height, marginLeft: innerCarouselMarginLeft }}
        >
          {items.map((item, i) => (
            <Item
              itemRef={itemRef}
              itemNo={i}
              item={item}
              margin={margin}
              cardWidths={cardWidths}
              cardHeights={cardHeights}
              margins={margins}
              range={range}
              x={x}
            />
          ))}
        </motion.div>
      </motion.div>
      <Tabs
        items={items}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
    </div>
  );
};
