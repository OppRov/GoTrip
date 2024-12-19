import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import Stages from "../components/planner/Stages";
import CalendarDisplay from "../components/CalendarDisplay";

const TripPlanPage = () => {
  const [currentTrip, setCurrentTrip] = useState({});
  const [currentStage, setCurrentStage] = useState(0);

  const handleBack = () => {
    setCurrentStage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentStage((prev) => prev + 1);
  };

  return (
    <>
      <Container>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid red",
            padding: "1rem",
            minWidth: "50vw",
          }}
        >
          {/* Stages */}
          <Stack
            direction={"column"}
            sx={{ width: "40%", height: "50%", border: "1px solid black" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid blue",
                padding: "1rem",
                height: "80%",
              }}
            >
              <Stages
                currentStage={currentStage}
                setCurrentStage={setCurrentStage}
              />
            </Box>
            {/* Next and back buttons in this box */}
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button variant="contained" onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Stack>
          {/* Result */}
          <Stack
            direction={"column"}
            sx={{ width: "60%", height: "100%", border: "1px solid black" }}
          >
            Result
            <CalendarDisplay />
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default TripPlanPage;
