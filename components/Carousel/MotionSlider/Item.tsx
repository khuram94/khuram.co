import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useDimensions } from "./use-dimensions";

import { Context } from "./Context";

const ItemWrapper: any = styled.div`
  flex: 0 0 auto;

  &:not(:last-child) {
    padding-right: ${(props: any) => props.gap}px;
  }
`;

const Item = ({ children, gap, padding }: any) => {
  const { dispatch } = useContext(Context);
  const [itemRef, { x }] = useDimensions();

  useEffect(() => {
    x && dispatch({ type: "ADD_ITEM", item: x - padding });
  }, [x]);

  return (
    <ItemWrapper ref={itemRef} gap={gap}>
      {children}
    </ItemWrapper>
  );
};

export default Item;
