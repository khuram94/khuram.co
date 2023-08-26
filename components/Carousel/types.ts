export type TItem = [{ imgPath: string; alt: string; colourScheme: string }];

export type TCarouselProps = {
  items: TItem;
  isMobile: boolean;
};
