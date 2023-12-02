import Header from "@/components/Header";

import MakeMusicContent from "./components/MakeMusicContent";

const MakeMusic = () => {
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
            Go For It!
          </h1>
        </div>
      </Header>
      <MakeMusicContent />
    </div>
  );
};

export default MakeMusic;
