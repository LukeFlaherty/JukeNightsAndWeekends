import Header from "@/components/Header";

import BuyJukeContent from "./components/BuyJukeContent";

const BuyJuke = () => {
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
            Fund Your Account
          </h1>
        </div>
      </Header>
      <BuyJukeContent />
    </div>
  );
};

export default BuyJuke;
