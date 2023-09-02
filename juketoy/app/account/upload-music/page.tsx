import Header from "@/components/Header";
import ProtectArtistRoute from "./components/ProtectArtistRoute";
import UploadMusicForm from "./components/UploadMusicForm";

const uploadMusic = () => {
  return (
    <ProtectArtistRoute>
      <div
        className="
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
      >
        <Header>
          <h1 className="text-2xl font-bold mb-4">Upload Your Music</h1>
          <p className="mb-8">
            This is a platform for talented artists like you. Use the form below
            to upload your music. We support MP3 format for songs and any common
            image format for the cover image.
          </p>
          <UploadMusicForm />
        </Header>
      </div>
    </ProtectArtistRoute>
  );
};

export default uploadMusic;
