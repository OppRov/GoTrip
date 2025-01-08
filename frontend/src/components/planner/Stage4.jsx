import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { planContext } from "../../contexts/planContext";
import axiosFetch from "../../api/axiosFetch";
import { TRIPS_URL } from "../../../constants/endpoints";

const Stage4 = () => {
  const { planData, setPlanData } = useContext(planContext);
  const [tripName, setTripName] = useState("");
  const { data, loading, error, fetchData } = axiosFetch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleSave = () => {
    if (!tripName.trim()) {
      alert("Please enter a trip name");
      return;
    }

    const formattedItinerary = planData.itinerary.reduce((acc, event) => {
      const date = event.start.split("T")[0];
      const existingDateEntry = acc.find((item) => item.date.startsWith(date));

      if (existingDateEntry) {
        existingDateEntry.events.push({
          name: event.title,
          time: event.start.split("T")[1].substring(0, 5),
        });
      } else {
        acc.push({
          date: event.start,
          events: [
            {
              name: event.title,
              time: event.start.split("T")[1].substring(0, 5),
            },
          ],
        });
      }
      return acc;
    }, []);

    fetchData({
      url: TRIPS_URL,
      method: "POST",
      token: localStorage.getItem("token"),
      body: {
        userID: userInfo?.id,
        tripName: tripName,
        fromDate: planData.startDate,
        toDate: planData.endDate,
        budget: planData.budget || 0,
        location: planData.destination,
        itinerary: formattedItinerary,
        recommended: false,
        ratingCount: 0,
        imageTrip: planData.image,
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
        width: "100%",
        p: 2,
      }}
    >
      <Typography variant="h5">Save Your Trip</Typography>

      <TextField
        fullWidth
        label="Trip Name"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
        sx={{ maxWidth: 400 }}
      />

      <Button
        variant="contained"
        onClick={handleSave}
        disabled={loading || !tripName.trim()}
      >
        {loading ? "Saving..." : "Save Trip"}
      </Button>

      {error && (
        <Typography color="error">
          Error saving trip. Please try again.
        </Typography>
      )}

      {data && (
        <Typography color="success.main">Trip saved successfully!</Typography>
      )}
    </Box>
  );
};

export default Stage4;
