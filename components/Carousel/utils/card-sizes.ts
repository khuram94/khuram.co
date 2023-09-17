const getActiveCardSize = (isMobile: boolean, carouselHeight?: number) => {
  const height = (carouselHeight || window.innerHeight) * 0.8;
  const width = isMobile ? window.innerWidth * 0.8 : (height / 4) * 3;

  return {
    height: Math.round(height),
    width: Math.round(width),
    margin: isMobile ? 10 : 50,
  };
};

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
