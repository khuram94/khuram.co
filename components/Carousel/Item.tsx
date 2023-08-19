import { useState } from "react";
import { useRouter } from "next/router";
import { useAnimation, useTransform, motion } from "framer-motion";
import { useWindowSize } from "@/hooks/use-window-size";

export const Item = ({
  itemRef,
  itemNo,
  item,
  margins,
  cardWidths,
  cardHeights,
  range,
  x,
}: any) => {
  const router = useRouter();
  const controls = useAnimation();
  const imageurl = `https://drive.google.com/uc?export=view&id=${item.imgPath}`;
  console.log({ imageurl });

  const getRange = () => {
    const values = range.slice(itemNo, itemNo + 5);
    return values.length === 5 ? values : [0, 0, 0, 0, 0];
  };

  const width = useTransform(x, getRange(), cardWidths);
  const height = useTransform(x, getRange(), cardHeights);
  const margin = useTransform(x, getRange(), margins);

  return (
    <motion.div
      className="item"
      style={{
        width,
        height,
        margin,
        display: range.length === 0 ? "none" : "",
      }}
      whileHover={{ scale: 1.05 }}
      key={itemNo}
      ref={(el) => el && (itemRef.current[itemNo] = el)}
      animate={controls}
      onTap={() => router.push("/album")}
    >
      {item?.imgPath && (
        <img
          src={imageurl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            overflow: "hidden",
          }}
        />
      )}
      {item.name && <div className="img-title">{item.name}</div>}
    </motion.div>
  );
};
