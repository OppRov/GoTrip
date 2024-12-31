import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const Stage2 = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "fit-content",
        gap: "5px",
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center">
        Stage 2
      </Typography>
      <p>Select your estimated budget</p>

      <TextField id="outlined-basic" label="Budget" variant="outlined" />
    </Box>
  );
};

export default Stage2;
