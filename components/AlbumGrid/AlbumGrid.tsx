import Image from "next/image";

type TAlbumGridProps = {
  imageUrls: Array<string>;
};

export const AlbumGrid = ({ imageUrls }: TAlbumGridProps) => (
  <div className="album-container">
    <div className="album-grid">
      {imageUrls.map((imageUrl, index) => (
        <div className="album-item" key={index}>
          <Image
            className="gradient-background"
            loader={() => imageUrl}
            src={imageUrl}
            fill={true}
            style={{ objectFit: "cover" }}
            alt=""
            sizes="320px 320px"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </div>
);
