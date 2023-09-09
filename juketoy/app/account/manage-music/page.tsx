import { FC } from "react";

const ManageMusic: FC = () => {
  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-mainBrandColor">
          Manage Music
        </h1>
        <p>This is a placeholder page for managing your music as an artist.</p>
        {/* Add your manage music functionality here */}
      </div>
    </div>
  );
};

export default ManageMusic;
