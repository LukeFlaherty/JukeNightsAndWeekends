import Header from "@/components/Header";
import ProtectArtistRoute from "./components/ProtectArtistRoute";
import getArtistDetails from "@/actions/getArtistDetails";
import getArtistSongs from "@/actions/getArtistSongs";
import ManageMusicContent from "./components/ManageMusicContent";

const ManageMusic = () => {
  const handleEditSong = (songId: string) => {
    // Implement your edit song logic here
    console.log(`Editing song with ID: ${songId}`);
  };

  const handleDeleteSong = (songId: string) => {
    // Implement your delete song logic here
    console.log(`Deleting song with ID: ${songId}`);
  };

  //       const artistDetails = await getArtistDetails(artistId);
  //   const artistSongs = await getArtistSongs(artistDetails!.artist_id);

  return (
    <ProtectArtistRoute>
      <div className="rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <Header>
          <h1 className="text-2xl font-bold mb-4">Manage Your Music</h1>
          <p className="mb-8">
            Welcome to the Music Management Portal, where you can take control
            of your artistic journey. Here, you can manage and organize your
            music collection effortlessly. Below, you'll find tools and options
            to handle your songs and albums. Here's what you can do:
          </p>
          <ul className="list-disc ml-6 mb-8">
            <li>
              <strong>Upload Music:</strong> Share your latest tracks with your
              audience by uploading your songs in MP3 format.
            </li>
            <li>
              <strong>Edit Song Details:</strong> Customize song titles,
              descriptions, and cover art to make your music stand out.
            </li>
            <li>
              <strong>Manage Playlists:</strong> Organize your songs into
              playlists for a seamless listening experience.
            </li>
            <li>
              <strong>Delete Songs:</strong> Remove songs that are no longer
              part of your repertoire.
            </li>
          </ul>
          <p>
            Feel free to explore and manage your music library. We're here to
            support your artistic journey!
          </p>
          <ManageMusicContent />
        </Header>
      </div>
    </ProtectArtistRoute>
  );
};

export default ManageMusic;
