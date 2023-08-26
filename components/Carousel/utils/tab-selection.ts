import { AnimationControls } from "framer-motion";

type THandleTabSelection = {
  tabControls: AnimationControls;
  boundaries: Array<number>;
  activeItem: number;
};
export const handleTabSelection = ({
  tabControls,
  boundaries,
  activeItem,
}: THandleTabSelection) =>
  tabControls.start({
    x: -boundaries[activeItem],
    transition: { type: "tween", duration: 0.5 },
  });
