import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
} from "@mui/material";
import React, { useState } from "react";

const StageList = [
  <div>
    <h1>Stage 1</h1>
    <h1>Stage 1</h1>
    <h1>Stage 1</h1>
  </div>,
  <div>
    <h1>Stage 2</h1>
    <h1>Stage 2</h1>
    <h1>Stage 2</h1>
  </div>,
  <div>
    <h1>Stage 3</h1>
  </div>,
];

//Page through the stages with a next and back button at the bottom
const Stages = () => {
  const [currentStage, setCurrentStage] = useState(0);

  const handleNext = () => {
    // Check if the current stage is the last stage
    if (currentStage === StageList.length - 1) {
      // If it is, loop to the beginning
      setCurrentStage(0 - 1);
    }
    setCurrentStage((prev) => prev + 1);
  };
  const handleBack = () => {
    // Check if the current stage is the first stage
    if (currentStage === 0) {
      // If it is, loop to the end
      setCurrentStage(StageList.length);
    }
    setCurrentStage((prev) => prev - 1);
  };

  return (
    <Card
      sx={{
        width: "250%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <h2>Stages</h2>
        {StageList[currentStage]}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </CardActions>
    </Card>
  );
};

export default Stages;
