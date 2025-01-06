import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  MobileStepper,
  Paper,
  Stack,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Stages from "../components/planner/Stages";
import { planContext, PlanProvider } from "../contexts/planContext";
import ResultView from "../components/planner/ResultView";
import { theme } from "../themes/AppTheme";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import TripCard from "../components/TripCard";

const TripPlanPage = () => {
  // const [currentTrip, setCurrentTrip] = useState({});
  const [currentStage, setCurrentStage] = useState(0);

  const { planData } = useContext(planContext);

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
          direction={{ sm: "column", md: "row" }}
          spacing={2}
          sx={{
            display: "flex",
            height: "90vh",
            justifyContent: "space-evenly",
            // alignItems: "center",
            // border: "1px solid red",
            padding: "1rem",
            minWidth: "50vw",
          }}
        >
          {/* Stages */}
          <Stack direction={"column"} sx={{ width: "40%", height: "100%" }}>
            <Paper
              elevation={3}
              sx={{
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
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
                <MobileStepper
                  variant="progress"
                  steps={3}
                  position="static"
                  activeStep={currentStage}
                  sx={{ mt: "1rem", maxWidth: "100%", flexGrow: 1 }}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={currentStage === 2}
                    >
                      Next
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={currentStage === 0}
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                      Back
                    </Button>
                  }
                />
                {/* <Button variant="contained" onClick={handleBack}>
                    Back
                  </Button>

                  <Button variant="contained" onClick={handleNext}>
                    Next
                  </Button> */}
              </Box>
            </Paper>
          </Stack>
          {/* Result */}
          <Paper elevation={3} sx={{ height: "100%", width: "60%" }}>
            <Stack
              direction={"column"}
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <ResultView />
            </Stack>
          </Paper>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <TripCard
              imageTrip={planData.image}
              destination={planData.destination}
              preview
              pItinerary={planData.itinerary}
              tripName={planData.title}
            />
          </Paper>
        </Stack>
      </Container>
    </>
  );
};

export default TripPlanPage;
