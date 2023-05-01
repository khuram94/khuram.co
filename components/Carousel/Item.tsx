import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAnimation, useTransform, motion } from "framer-motion";

export const Item = ({
  itemRef,
  itemNo,
  item,
  margins,
  cardWidths,
  cardHeights,
  range,
  x,
}) => {
  const router = useRouter();
  const controls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);
  const imageurl = `https://drive.google.com/uc?export=view&id=${item.imgPath}`;
  console.log({ imageurl });
  const getRange = () => {
    const values = range.slice(itemNo, itemNo + 5);
    return values.length === 5 ? values : [0, 0, 0, 0, 0];
  };

  const width = useTransform(x, getRange(), cardWidths);
  const height = useTransform(x, getRange(), cardHeights);
  const margin = useTransform(x, getRange(), margins);

  const clickHandler = (event, info) => {
    console.log({ info });
  };

  return (
    <motion.div
      className="item"
      style={{
        width,
        height,
        margin,
        display: range.length === 0 ? "none" : "",
        backgroundColor: "red",
      }}
      whileHover={{ scale: 1.05 }}
      key={itemNo}
      ref={(el) => el && (itemRef.current[itemNo] = el)}
      animate={controls}
      onTap={() => router.push("/gallery?album=tokyo")}
    >
      {item?.imgPath && (
        // <Image
        //   loading="eager"
        //   src={`https://drive.google.com/uc?export=view&id=${item.imgPath}`}
        //   // src={item.imgPath}
        //   alt={item.alt}
        //   style={{ position: "relative" }}
        //   width={350}
        //   height={350}
        // />

        <img
          src={`https://drive.google.com/uc?export=view&id=${item.imgPath}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            overflow: "hidden",
          }}

          // alt="hello"
        />
      )}
      <div className="img-title">Japan</div>
    </motion.div>
  );
};
