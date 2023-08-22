"use client ";

import Box from "@/components/Box";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      {/* TODO: color not working on spinner */}
      <BounceLoader color="mainBrandColor" size={40} />
    </Box>
  );
};

export default Loading;
