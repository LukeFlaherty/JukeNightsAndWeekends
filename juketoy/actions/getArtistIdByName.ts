interface Artist {
  name: string;
  artist_id: string;
}

const getArtistIdByName = (
  artistName: string,
  artistsList: Artist[]
): string | undefined => {
  const matchedArtist = artistsList.find(
    (artist) => artist.name === artistName
  );
  return matchedArtist?.artist_id;
};

export default getArtistIdByName;
