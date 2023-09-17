import Image from "next/image";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { TAlbum } from "@/types/album";

type TAlbumGridProps = {
  images: TAlbum[];
};

type TView = {
  listView?: boolean;
};

const View = styled.div<TView>`
  display: grid;
  grid-template-columns: ${(props: any) =>
    props.listView ? "unset" : "auto auto auto"};

  width: 100%;
  align-self: center;
  @media (max-width: 975px) {
    width: 100vw;
    align-self: unset;
  }
`;

const AlbumItem = styled.div<TView>`
  border: 30px solid rgba(0, 0, 0, 0);
  position: relative;
  aspect-ratio: 1;

  @media (max-width: 975px) {
    border: ${(props: any) =>
      props.listView ? "unset" : "1px solid rgba(0, 0, 0, 0)"};
    aspect-ratio: ${(props: any) => (props.listView ? "unset" : 1)};
    height: ${(props: any) => (props.listView ? "80dvh" : "unset")};
  }
`;

export const AlbumGrid = ({ images }: TAlbumGridProps) => {
  const [listView, setListView] = useState(false);
  const [clickedImage, setClickedImage] = useState<string>("");
  const [scrollY, setScrollY] = useState<number>();

  useEffect(() => {
    if (listView) {
      document?.getElementById(clickedImage)?.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
    } else {
      document.body.scrollTo({ top: scrollY });
    }
  }, [clickedImage, listView, scrollY]);

  const imgContainerClassName = listView ? "" : "img-container";

  return (
    <div className="album-container">
      <View listView={listView}>
        {images.map(({ url }: any, index: number) => (
          <div className={imgContainerClassName} key={index}>
            <AlbumItem id={`image-${index}`} listView={listView}>
              <Image
                className="gradient-background album-img"
                loader={() => `${url}?w=2000&h=2000`}
                src={`${url}`}
                fill={true}
                alt=""
                sizes="320px 320px"
                loading="lazy"
                onClick={() => {
                  !listView && setScrollY(document.body.scrollTop);
                  setListView(!listView);
                  setClickedImage(`image-${index}`);
                }}
              />
            </AlbumItem>
          </div>
        ))}
      </View>
    </div>
  );
};
