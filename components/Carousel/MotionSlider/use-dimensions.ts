import React, { useLayoutEffect, useRef, useState } from "react";
// React.useLayoutEffect = React.useEffect;

export const useDimensions = () => {
  const ref = useRef<HTMLInputElement>();
  const [dimensions, setDimensions] = useState<any>({});
  useLayoutEffect(() => {
    setDimensions(ref.current?.getBoundingClientRect().toJSON());
  }, [ref.current]);

  return [ref, dimensions];
};
