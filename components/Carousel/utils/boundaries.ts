import { TItem } from "../types";

type TBoundaryProps = {
  items: TItem;
  xsWidth: number;
  sWidth: number;
  xsMargin: number;
  sMargin: number;
};

export const getBoundaries = ({
  items,
  xsWidth,
  sWidth,
  xsMargin,
  sMargin,
}: TBoundaryProps) =>
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
  );
