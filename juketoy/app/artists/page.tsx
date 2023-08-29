import ArtistItem from "./components/ArtistItem";
import getAllArtists from "@/actions/getAllArtists"; // Adjust the import path.
import Header from "@/components/Header";
import ArtistListContent from "./components/ArtistListContent";

const ArtistList = async () => {
  const artists = (await getAllArtists()) || [];
  console.log("ARTISTS in the main page:", artists);

  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-mainBrandColor text-3xl font-semibold">
            All Artists
          </h1>
          <ArtistListContent artists={artists} />
        </div>
      </Header>
    </div>
  );
};

export default ArtistList;
