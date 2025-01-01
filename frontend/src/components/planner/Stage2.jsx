import { Box, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { planContext } from "../../contexts/planContext";

const Stage2 = () => {
  const { planData, setPlanData } = useContext(planContext);

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

      <TextField
        id="outlined-basic"
        label="Budget"
        variant="outlined"
        onChange={(e) => setPlanData({ ...planData, budget: e.target.value })}
      />
    </Box>
  );
};

export default Stage2;
