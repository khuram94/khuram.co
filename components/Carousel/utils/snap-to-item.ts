import { Dispatch, SetStateAction } from "react";

type TSnapToItemProps = {
  target: number;
  boundaries: Array<number>;
  setActiveItem: Dispatch<SetStateAction<number>>;
};

export const snapToItem = ({
  target,
  boundaries,
  setActiveItem,
}: TSnapToItemProps) => {
  if (target > 0) {
    setActiveItem(0);
    return 0;
  }
  const endPosition = Math.abs(target);

  const closestPosition = boundaries?.reduce((prev: any, curr: any) =>
    Math.abs(curr - endPosition) < Math.abs(prev - endPosition) ? curr : prev
  );

  setActiveItem(boundaries.indexOf(closestPosition));
  return target < 0 ? -Math.abs(closestPosition) : 0;
};
