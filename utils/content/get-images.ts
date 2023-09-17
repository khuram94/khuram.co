import { createClient } from "contentful";
import { TPhoto } from "@/types/album";

const fetchAlbumByTag = async (tag: string) => {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
  });

  const album = await client
    .getEntries({ "metadata.tags.sys.id[in]": [tag] })
    .then((entries) => entries?.items?.[0]?.fields);

  const spotifyTrackId = album?.spotifyTrackId || "";

  return { spotifyTrackId, images: album?.images };
};

type TTag = {
  sys: {
    type: string;
    linkType: string;
    id: string;
  };
};

const formatTags = (metadata: any) => {
  const tags = metadata?.tags.map((tag: TTag) => tag.sys.id);
  const locationTag = tags?.find((tag: any) => tag.includes("location"));
  const location = locationTag?.split("location")[1];
  return {
    location,
    tags: tags?.filter((tag: any) => !tag.includes("location")),
  };
};

type TAlbumContent = {
  spotifyTrackId: string;
  images: any[];
};

export const getAlbum = async (tag: string) => {
  const { spotifyTrackId, images } = (await fetchAlbumByTag(
    tag
  )) as TAlbumContent;

  const photos: Array<TPhoto> = [];
  images?.forEach(({ metadata, fields }) => {
    const url = fields?.file?.url;

    const { location, tags } = formatTags(metadata);
    if (url) {
      photos.push({ location, url, tags });
    }
  });

  return { spotifyTrackId, photos };
};
