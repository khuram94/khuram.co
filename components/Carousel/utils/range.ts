const makeNegative = (array: number[]) => array.map((x) => -Math.abs(x));

export const getRange = (itemBoundaries: number[], activeCardSpace: number) => {
  const range: number[] = [
    activeCardSpace * 2,
    activeCardSpace,
    ...makeNegative(itemBoundaries),
  ];
  const lastItemRange: number = range[range.length - 1];
  range.push(lastItemRange - activeCardSpace);
  range.push(lastItemRange - activeCardSpace * 2);
  return range;
};
