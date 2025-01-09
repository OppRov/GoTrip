import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  MobileStepper,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Rating,
  DialogActions,
  Typography,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import Stages from "../components/planner/Stages";
import { planContext, PlanProvider } from "../contexts/planContext";
import ResultView from "../components/planner/ResultView";
import { theme } from "../themes/AppTheme";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import TripCard from "../components/TripCard";
import axiosFetch from "../api/axiosFetch";
import { TRIPS_URL } from "../../constants/endpoints";

const TripPlanPage = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [latestTrip, setLatestTrip] = useState(null);
  const { planData } = useContext(planContext);

  const { data, loading, error, fetchData } = axiosFetch();

  // Fetch latest unrated trip when component mounts
  useEffect(() => {
    const fetchLatestTrip = async () => {
      try {
        await fetchData({
          url: `${TRIPS_URL}/getLatestUnratedTrip/${JSON.parse(localStorage.getItem("userInfo"))?.id}`,
          method: "GET",
          token: localStorage.getItem("token"),
        });
      } catch (err) {
        console.error("Error fetching latest trip:", err);
      }
    };

    fetchLatestTrip();
  }, []);

  useEffect(() => {
    if (!loading && !error && data?.data) {
      setLatestTrip(data.data);
      setOpenRatingModal(!!data.data);
    }
  }, [data, loading, error]);

  const handleRatingSubmit = async () => {
    try {
      await fetchData({
        url: `${TRIPS_URL}/rateTrip/${latestTrip.id}`,
        method: "POST",
        data: { rating },
        token: localStorage.getItem("token"),
      });
      setOpenRatingModal(false);
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  const handleBack = () => {
    setCurrentStage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentStage((prev) => prev + 1);
  };

  return (
    <>
      <Dialog open={openRatingModal} onClose={() => setOpenRatingModal(false)}>
        <DialogTitle>Rate Your Trip to {latestTrip?.destination}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            How would you rate your recent trip?
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            size="large"
            precision={0.5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRatingModal(false)}>Skip</Button>
          <Button
            onClick={handleRatingSubmit}
            variant="contained"
            disabled={!rating}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

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
                  steps={4}
                  position="static"
                  activeStep={currentStage}
                  sx={{ mt: "1rem", maxWidth: "100%", flexGrow: 1 }}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={currentStage === 3}
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
          {currentStage < 2 && (
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TripCard
                imageTrip={planData.image}
                location={planData.destination}
                preview={true}
                isAvailable={false}
                tripName={planData.title}
                fromDate={planData.startDate}
                toDate={planData.endDate}
                planData={planData}
              />
            </Paper>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default TripPlanPage;
