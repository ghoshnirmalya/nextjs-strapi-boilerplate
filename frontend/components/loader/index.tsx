import React, { FC } from "react";
import { Box, CircularProgress } from "@chakra-ui/core";

interface Props {
  size?: string;
  thickness?: number;
}

const Loader: FC<Props> = ({ size = "50px", thickness = 0.15 }) => {
  return (
    <Box w="full" textAlign="center" maxH="200px">
      <CircularProgress isIndeterminate size={size} thickness={thickness} />
    </Box>
  );
};

export default Loader;
