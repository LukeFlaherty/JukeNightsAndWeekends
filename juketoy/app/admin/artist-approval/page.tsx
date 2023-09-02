import { UserDetails } from "@/types";
import ArtistApprovalTable from "./components/ArtistApprovalTable";
import Header from "@/components/Header";
import getPendingArtists from "@/actions/getPendingArtists";

interface pageProps {
  artists: UserDetails[];
}

const ArtistApproval: React.FC<pageProps> = async ({ artists }) => {
  const pendingArtists = await getPendingArtists();
  const filteredPendingArtists = pendingArtists!.filter(
    (artist) => artist.artist_approval_status === "pending"
  );

  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <h1 className="text-2xl font-bold mb-4">Artist Approval Dashboard</h1>
        <ArtistApprovalTable artists={filteredPendingArtists || []} />
      </Header>
    </div>
  );
};

export default ArtistApproval;
