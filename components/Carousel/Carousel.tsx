import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { Item } from "./Item";
import { Tabs } from "./Tabs";
import {
  snapToItem,
  getCardSizes,
  getBoundaries,
  getRange,
  handleTabSelection,
} from "./utils";
import { TCarouselProps } from "./types";

export const Carousel = ({ items, isMobile }: TCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const tabControls = useAnimation();
  const x = useMotionValue(0);
  const [range, setRange] = useState<Array<number>>([]);
  const [activeItem, setActiveItem] = useState(0);

  const carouselHeight = carouselRef?.current?.clientHeight;

  const { cardHeights, cardWidths, cardMargins, activeCardSpace } =
    getCardSizes(isMobile, carouselHeight);

  const [xsWidth, sWidth] = cardWidths;
  const [xsMargin, sMargin] = cardMargins;

  const boundaries = getBoundaries({
    items,
    xsWidth,
    sWidth,
    xsMargin,
    sMargin,
  });

  const leftConstraint = -boundaries[boundaries.length - 1];
  const carouselWidth = carouselRef?.current?.clientWidth;
  const innerCarouselMarginLeft =
    (carouselWidth || 0) / 2 - activeCardSpace / 2;

  useEffect(() => setRange(getRange(boundaries, activeCardSpace)), []);

  useEffect(() => {
    handleTabSelection({ tabControls, boundaries, activeItem });
  }, [activeItem, tabControls, boundaries]);

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
            power: 0.1,
            timeConstant: 300,
            modifyTarget: (target) =>
              snapToItem({ target, boundaries, setActiveItem }),
          }}
          whileDrag={{ cursor: "grabbing" }}
          onAnimationComplete={() =>
            tabControls.set({ x: -boundaries[activeItem] })
          }
          style={{
            x,
            marginLeft: innerCarouselMarginLeft,
          }}
          animate={tabControls}
        >
          {items.map((item, i) => (
            <Item
              key={i}
              itemNo={i}
              item={item}
              cardWidths={cardWidths}
              cardHeights={cardHeights}
              margins={cardMargins}
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
