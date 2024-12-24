import { Box } from "@mui/material";
import React from "react";

const Stage2 = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        border: "1px solid red",
        width: "fit-content",
        gap: "5px",
      }}
    >
      <h1>Stage 2</h1>
    </Box>
  );
};

export default Stage2;
