import { useRef, useEffect, useState } from "react";
import {
  PanInfo,
  motion,
  useAnimation,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";

import { Item } from "./Item";
import { Tabs } from "./Tabs";

type TItem = [{ imgPath: string; alt: string; colourScheme: string }];

type TCarouselProps = {
  items: TItem;
  isMobile: boolean;
};

export const Carousel = ({ items, isMobile }: TCarouselProps) => {
  const width = isMobile ? 250 : 450;
  const height = isMobile ? 400 : 650;
  const margin = isMobile ? 10 : 100;
  const itemRef = useRef<Array<HTMLDivElement>>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);

  const [boundaries, setBoundaries] = useState<number[]>([]);
  const [range, setRange] = useState<Array<number>>([]);
  const [activeItem, setActiveItem] = useState(0);
  const [leftConstraint, setLeftConstraint] = useState(0);
  const sWidth = width * 0.8;
  const xsWidth = width * 0.5;
  const sHeight = height * 0.8;
  const xsHeight = height * 0.5;
  const sMargin = margin * 0.95;
  const xsMargin = margin * 0.85;

  const [cardWidths, setCardWidths] = useState([
    xsWidth,
    sWidth,
    width,
    sWidth,
    xsWidth,
  ]);

  const [margins, setMargins] = useState([
    xsMargin,
    sMargin,
    margin,
    sMargin,
    xsMargin,
  ]);

  const [cardHeights, setCardHeights] = useState([
    xsHeight,
    sHeight,
    height,
    sHeight,
    xsHeight,
  ]);

  const [activeCardSpace, setActiveCardSpace] = useState(width + margin * 2);
  const cardSpace = width + margin * 2;

  const makeNegative = (array: number[]) => array.map((x) => x * -1);

  const innerCarouselMarginLeft =
    (carouselRef?.current?.clientWidth || 0) / 2 - activeCardSpace / 2;

  const makeRange = (bounds: number[]) => {
    console.log({ bounds });
    const range: number[] = [cardSpace * 2, cardSpace, ...makeNegative(bounds)];
    const lastItemRange: number = range[range.length - 1];
    range.push(lastItemRange - cardSpace);
    range.push(lastItemRange - cardSpace * 2);
    console.log({ range });
    return range;
  };

  const initialsizes = [
    sWidth,
    xsWidth,
    xsWidth,
    xsWidth,
    xsWidth,
    xsWidth,
    xsWidth,
    xsWidth,
    xsWidth,
    xsWidth,
    xsWidth,
    xsWidth,
  ];
  const initialMargins = [
    sMargin,
    xsMargin,
    xsMargin,
    xsMargin,
    xsMargin,
    xsMargin,
    xsMargin,
    xsMargin,
    xsMargin,
    xsMargin,
    xsMargin,
    xsMargin,
  ];

  const setBounds = (cardSizes: number[], cardMargins: number[]) =>
    items.reduce(
      (pV, cV, cI) => {
        if (cI < items.length - 1) {
          const cardSize = cI === 0 ? sWidth : xsWidth;
          const margin = cI === 0 ? sMargin : xsMargin;
          const bound = cardSize + margin * 2 + pV[pV.length - 1];
          pV.push(bound);
        }
        return pV;
      },
      [0]
    );

  useEffect(() => {
    const bounds = setBounds(initialsizes, initialMargins);
    const range = makeRange(bounds);
    setRange(range);
    setBoundaries(bounds);
    setLeftConstraint(-bounds[bounds.length - 1]);
  }, []);
  const dragEnd = (_: any, info: PanInfo) => {
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

  //   on tab selection
  useEffect(() => {
    controls.start({
      x: -boundaries[activeItem],
      transition: { type: "tween", duration: 0.5 },
    });
  }, [activeItem]);

  useMotionValueEvent(x, "animationComplete", () => {
    controls.set({ x: -boundaries[activeItem] });
  });

  return (
    <>
      <div className="carousel-container">
        <motion.div className="carousel" ref={carouselRef}>
          <motion.div
            className="inner-carousel"
            drag="x"
            dragConstraints={{
              right: 0,
              left: leftConstraint,
            }}
            whileDrag={{ cursor: "grabbing" }}
            onDragEnd={dragEnd}
            animate={controls}
            style={{
              x,
              marginLeft: innerCarouselMarginLeft,
            }}
          >
            {items.map((item, i) => (
              <Item
                key={i}
                itemRef={itemRef}
                itemNo={i}
                item={item}
                cardWidths={cardWidths}
                cardHeights={cardHeights}
                margins={margins}
                range={range}
                x={x}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
      <Tabs
        items={items}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        tabPosition={height / 2 + 70}
      />
    </>
  );
};
