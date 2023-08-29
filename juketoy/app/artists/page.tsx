import Header from "@/components/Header";
import ArtistItem from "./components/ArtistItem";

// Sample data or fetch it from your backend.
const artists = ["beatles", "nirvana", "pinkfloyd"];

export default function ArtistList() {
  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-mainBrandColor text-3xl font-semibold">
            All Artists
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cold-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
            {artists.map((artist) => (
              <ArtistItem key={artist} artistName={artist} />
            ))}
          </div>
        </div>
      </Header>
    </div>
  );
}
