import * as React from "react";
import Box from "@mui/material/Box";
import { CircularProgress, Grid } from "@mui/material";

export const Spinner = () => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      my={8}
    >
      <CircularProgress />
    </Box>
  );
};
