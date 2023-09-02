import Header from "@/components/Header";

import AccountContent from "./components/AccountContent";
import getArtistDetails from "@/actions/getArtistDetails";

const Account = () => {
  return (
    <div
      className="
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
        text-mainBrandColor
      "
    >
      <Header>
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-mainBrandColor text-3xl font-semibold">
            Account Settings
          </h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};

export default Account;
