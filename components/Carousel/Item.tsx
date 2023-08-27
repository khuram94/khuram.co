import { useRouter } from "next/router";
import Image from "next/image";
import { useAnimation, useTransform, motion } from "framer-motion";

const formatName = (name: string) => {
  return name.replace(" ", "-").toLowerCase();
};

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
        position: "relative",
      }}
      whileHover={{ scale: 1.05 }}
      key={itemNo}
      animate={controls}
      onTap={() => router.push(`/gallery/${formatName(item.name)}`)}
    >
      {item?.imgPath && (
        <Image
          className="gradient-background"
          loader={() => imageurl}
          src={imageurl}
          fill={true}
          style={{ objectFit: "cover" }}
          alt=""
          loading="eager"
          priority
        />
      )}
      {item.name && <div className="img-title">{item.name}</div>}
    </motion.div>
  );
};
