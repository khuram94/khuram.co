import { useRouter } from "next/router";
import Image from "next/image";
import { useAnimation, useTransform, motion } from "framer-motion";

export const Item = ({
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
      onTap={() => router.push(`/gallery/${item.location.toLowerCase()}`)}
    >
      {item?.url && (
        <Image
          className="gradient-background"
          loader={() => `${item.url}?w=2000&h=2000`}
          src={item.url}
          fill={true}
          style={{ objectFit: "cover" }}
          alt=""
          loading="eager"
          priority
        />
      )}
      {item.location && <div className="img-title">{item.location}</div>}
    </motion.div>
  );
};
