const desktopCardSizes = (carouselHeight?: number) => ({
  height: (carouselHeight || window.innerHeight) * 0.8,
  width: (window.innerWidth * 0.8) / 3,
  margin: 100,
});

const getActiveCardSize = (isMobile: boolean, carouselHeight?: number) =>
  isMobile
    ? {
        height: (carouselHeight || window.innerHeight) * 0.8,
        width: window.innerWidth * 0.8,
        margin: window.innerWidth * 0.025,
      }
    : desktopCardSizes(carouselHeight);

export const getCardSizes = (isMobile: boolean, carouselHeight?: number) => {
  const { height, width, margin } = getActiveCardSize(isMobile, carouselHeight);
  const xsWidth = width * 0.5;
  const sWidth = width * 0.8;
  const xsHeight = height * 0.5;
  const sHeight = height * 0.8;
  const xsMargin = margin * 0.85;
  const sMargin = margin * 0.95;

  const cardHeights = [xsHeight, sHeight, height, sHeight, xsHeight];
  const cardWidths = [xsWidth, sWidth, width, sWidth, xsWidth];
  const cardMargins = [xsMargin, sMargin, margin, sMargin, xsMargin];
  const activeCardSpace = width + margin * 2;
  return { cardHeights, cardWidths, cardMargins, activeCardSpace };
};
