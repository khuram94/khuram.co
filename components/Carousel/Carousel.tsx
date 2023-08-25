import { useRef, useCallback, useEffect, useState } from "react";
import {
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
  const itemRef = useRef<Array<HTMLDivElement>>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  const tabControls = useAnimation();
  const x = useMotionValue(0);
  const [boundaries, setBoundaries] = useState<number[]>([]);
  const [range, setRange] = useState<Array<number>>([]);
  const [activeItem, setActiveItem] = useState(0);

  console.log({ boundaries, range, activeItem, tabControls, x });
  const [leftConstraint, setLeftConstraint] = useState(0);

  const mobileHeight = window.innerHeight * 0.6;
  const mobileWidth = window.innerWidth * 0.8;
  const mobileMargin = window.innerWidth * 0.025;

  const height = isMobile ? mobileHeight : 650;
  const width = isMobile ? mobileWidth : 450;
  const margin = isMobile ? mobileMargin : 100;

  const sWidth = width * 0.8;
  const xsWidth = width * 0.5;
  const sHeight = height * 0.8;
  const xsHeight = height * 0.5;
  const sMargin = margin * 0.95;
  const xsMargin = margin * 0.85;

  const cardHeights = [xsHeight, sHeight, height, sHeight, xsHeight];
  const cardWidths = [xsWidth, sWidth, width, sWidth, xsWidth];
  const margins = [xsMargin, sMargin, margin, sMargin, xsMargin];

  const activeCardSpace = width + margin * 2;

  const cardSpace = width + margin * 2;

  const makeNegative = (array: number[]) => array.map((x) => -Math.abs(x));

  const innerCarouselMarginLeft =
    (carouselRef?.current?.clientWidth || 0) / 2 - activeCardSpace / 2;

  const makeRange = useCallback(
    (bounds: number[]) => {
      const range: number[] = [
        cardSpace * 2,
        cardSpace,
        ...makeNegative(bounds),
      ];
      const lastItemRange: number = range[range.length - 1];
      range.push(lastItemRange - cardSpace);
      range.push(lastItemRange - cardSpace * 2);
      return range;
    },
    [cardSpace]
  );

  const setBounds = useCallback(
    () =>
      items.reduce(
        (pV, _, cI) => {
          if (cI < items.length - 1) {
            const cardSize = cI === 0 ? sWidth : xsWidth;
            const margin = cI === 0 ? sMargin : xsMargin;
            const bound = cardSize + margin * 2 + pV[pV.length - 1];
            pV.push(bound);
          }
          return pV;
        },
        [0]
      ),
    [items, xsWidth, sWidth, xsMargin, sMargin]
  );

  const snapToItem = (target) => {
    const endPosition = Math.abs(target);

    const closestPosition = boundaries?.reduce((prev: any, curr: any) =>
      Math.abs(curr - endPosition) < Math.abs(prev - endPosition) ? curr : prev
    );

    setActiveItem(boundaries.indexOf(closestPosition));
    return target < 0 ? -Math.abs(closestPosition) : Math.abs(closestPosition);
  };

  useEffect(() => {
    const bounds = setBounds();
    const range = makeRange(bounds);
    setRange(range);
    setBoundaries(bounds);
    setLeftConstraint(-bounds[bounds.length - 1]);
  }, [makeRange, setBounds]);

  //  on tab selection
  useEffect(() => {
    console.log({ activeItem }, "to: ", -boundaries[activeItem]);
    tabControls.start({
      x: -boundaries[activeItem],
      transition: { type: "tween", duration: 0.5 },
    });
  }, [activeItem, tabControls, boundaries]);

  useMotionValueEvent(x, "animationComplete", () => {
    tabControls.set({ x: -boundaries[activeItem] });
  });

  return (
    <>
      <motion.div className="carousel" ref={carouselRef}>
        <motion.div
          className="inner-carousel"
          drag="x"
          dragConstraints={{
            right: 0,
            left: leftConstraint,
          }}
          dragTransition={{
            power: 0.4,
            timeConstant: 300,
            modifyTarget: snapToItem,
          }}
          // whileDrag={{ cursor: "grabbing" }}
          style={{
            x,
            marginLeft: innerCarouselMarginLeft,
          }}
          animate={tabControls}
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
      <Tabs
        items={items}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
    </>
  );
};
