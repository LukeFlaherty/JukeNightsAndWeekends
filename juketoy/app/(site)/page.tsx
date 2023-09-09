import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";
import getPlaylistsByUserId from "@/actions/getPlaylistsByUserId";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const userPlaylists = await getPlaylistsByUserId();
  // const address = useAddress();

  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-mainBrandColor text-3xl font-semibold">
            Welcome Back
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-mainBrandColor text-2xl font-semibold">
            Newest Songs
          </h1>
        </div>
        <PageContent songs={songs} playlists={userPlaylists} />
      </div>
    </div>
  );
}
