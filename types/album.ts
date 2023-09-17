export type TPhoto = {
  location: string;
  url: string;
  tags: string[];
};

export type TAlbum = {
  spotifyTrackId: string;
  photos: TPhoto[];
};
