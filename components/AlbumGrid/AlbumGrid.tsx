import Image from "next/image";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { TAlbum } from "@/types/album";

type TAlbumGridProps = {
  images: TAlbum;
};

type TView = {
  listView?: boolean;
};

const View = styled.div<TView>`
  display: grid;
  grid-template-columns: ${(props: any) =>
    props.listView ? "unset" : "auto auto auto"};

  width: 975px;
  align-self: center;

  @media (max-width: 975px) {
    width: 100vw;
    align-self: unset;
  }
`;

export const AlbumGrid = ({ images }: TAlbumGridProps) => {
  const [listView, setListView] = useState(false);
  const [clickedImage, setClickedImage] = useState<string | undefined>();

  useEffect(() => {
    clickedImage &&
      document?.getElementById(clickedImage)?.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
    setClickedImage(undefined);
  }, [listView, clickedImage]);

  return (
    <div className="album-container">
      <View listView={listView}>
        {images.map(({ url }: any, index: number) => (
          <div className="album-item" key={index} id={`image-${index}`}>
            <Image
              className="gradient-background"
              loader={() => `${url}?w=2000&h=2000`}
              src={`${url}?w=1000&h=1000`}
              fill={true}
              style={{ objectFit: "cover", borderRadius: "1.5rem" }}
              alt=""
              sizes="320px 320px"
              loading="lazy"
              onClick={() => {
                setClickedImage(`image-${index}`);
                setListView(!listView);
              }}
            />
          </div>
        ))}
      </View>
    </div>
  );
};
