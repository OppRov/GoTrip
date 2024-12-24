import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import Stages from "../components/planner/Stages";
import CalendarDisplay from "../components/CalendarDisplay";
import { PlanProvider } from "../contexts/planContext";
import ResultView from "../components/planner/ResultView";
import { theme } from "../themes/AppTheme";

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
      <PlanProvider>
        <Container>
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={2}
            sx={{
              display: "flex",
              height: "100vh",
              justifyContent: "space-between",
              alignItems: "center",
              // border: "1px solid red",
              padding: "1rem",
              minWidth: "50vw",
            }}
          >
            {/* Stages */}
            <Stack direction={"column"} sx={{ width: "40%", height: "50%" }}>
              <Paper
                elevation={3}
                sx={{
                  height: "100%",
                  background: theme.palette.secondary.lighter,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    // border: "1px solid blue",
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
              </Paper>
            </Stack>
            {/* Result */}
            <Stack
              direction={"column"}
              sx={{ width: "60%", height: "100%", border: "1px solid black" }}
            >
              <ResultView />
            </Stack>
          </Stack>
        </Container>
      </PlanProvider>
    </>
  );
};

export default TripPlanPage;
