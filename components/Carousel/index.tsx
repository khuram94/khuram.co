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
  width = 320,
  height = 450,
  margin = 75,
}: TCarouselProps) => {
  const itemRef = useRef<Array<HTMLDivElement>>([]);
  const controls = useAnimation();
  const x = useMotionValue(0);

  const [boundaries, setBoundaries] = useState<number[]>([]);
  const [range, setRange] = useState<Array<number>>([]);
  const [position, setPosition] = useState(0);

  const sWidth = width * 0.75;
  const xsWidth = width * 0.5;
  const sHeight = height * 0.75;
  const xsHeight = height * 0.5;

  const cardWidths = [xsWidth, sWidth, width, sWidth, xsWidth];
  const cardHeights = [xsHeight, sHeight, height, sHeight, xsHeight];
  const cardSpace = width + margin * 2;

  const makeNegative = (array: number[]) => array.map((x) => x * -1);

  const makeRange = (bounds: number[]) => {
    const range: number[] = [cardSpace * 2, cardSpace, ...makeNegative(bounds)];
    const lastItemRange: number = range[range.length - 1];
    range.push(lastItemRange - cardSpace);
    range.push(lastItemRange - cardSpace * 2);
    return range;
  };

  const initialsizes = [sWidth, xsWidth, xsWidth, xsWidth, xsWidth, xsWidth];

  useEffect(() => {
    // const bounds = items.map(
    //   (_, i) =>
    //     console.log("item ", i, ": ", itemRef.current?.[i].clientWidth) ||
    //     (240 + margin * 2) * i
    // );

    const bounds = initialsizes.reduce(
      (pV, cV, cI) => {
        const bound = initialsizes[cI] + margin * 2 + pV[pV.length - 1];
        pV.push(bound);
        return pV;
      },
      [0]
    );

    console.log({ bounds });

    const range = makeRange(bounds);
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
        style={{ x }}
      >
        {items.map((item, i) => (
          <Item
            itemRef={itemRef}
            itemNo={i}
            item={item}
            margin={margin}
            cardWidths={cardWidths}
            cardHeights={cardHeights}
            range={range}
            x={x}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export const Item = ({
  itemRef,
  itemNo,
  item,
  margin,
  cardWidths,
  cardHeights,
  range,
  x,
}) => {
  const getRange = () => {
    const values = range.slice(itemNo, itemNo + 5);
    return values.length === 5 ? values : [0, 0, 0, 0, 0];
  };

  const width = useTransform(x, getRange(), cardWidths);
  const height = useTransform(x, getRange(), cardHeights);

  // useMotionValueEvent(x, "change", () => {
  //   itemRef.current[itemNo].style.width = `${width.get()}px`;
  //   // itemRef.current[itemNo].style.height = `${cardHeight.get()}px`;
  // });

  // style={{backgroundImage: `url(https://drive.google.com/uc?export=view&id=${imageIds[0]})`, backgroundSize: '100%'}}
  return (
    <motion.div
      className="item"
      style={{
        width,
        height,
        margin,
        background: item.colourScheme,
        display: range.length === 0 ? "none" : "",
      }}
      key={itemNo}
      ref={(el) => el && (itemRef.current[itemNo] = el)}
    >
      <Image
        loading="eager"
        src={`url(https://drive.google.com/uc?export=view&id=${item.imgPath})`}
        style={{
          backgroundImage: `url(https://drive.google.com/uc?export=view&id=${item.imgPath})`,
        }}
        alt={item.alt}
        // style={{ position: "relative" }}
        width={350}
        height={350}
      />
      {/* {i} */}
    </motion.div>
  );
};
