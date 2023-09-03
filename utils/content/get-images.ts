import { createClient } from "contentful";
import { TAlbum } from "@/types/album";

const fetchImagesByTag = async (tag: string) => {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
  });

  const content = await client
    .getEntries({ "metadata.tags.sys.id[in]": [tag] })
    .then((entries) => entries?.items?.[0]?.fields);

  return content?.images;
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

export const getAlbum = async (tag: string) => {
  const images = (await fetchImagesByTag(tag)) as any[];

  const album: TAlbum = [];
  images?.forEach(({ metadata, fields }) => {
    const url = fields?.file?.url;

    const { location, tags } = formatTags(metadata);
    if (url) {
      album.push({ location, url, tags });
    }
  });

  return album;
};
