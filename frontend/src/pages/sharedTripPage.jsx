import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import axiosFetch from "../api/axiosFetch";
import { TRIPS_URL } from "../../constants/endpoints";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TripCard from "../components/TripCard";

const SharedTripPage = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const { data, loading, error, fetchData } = axiosFetch();

  useEffect(() => {
    fetchData({
      url: `${TRIPS_URL}/getTrip/${tripId}`,
      method: "GET",
    });
  }, [tripId]);

  useEffect(() => {
    if (!loading && data) {
      setTrip(data.data);
    }
  }, [data, loading]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !trip) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6" color="error">
          Trip not found or an error occurred. Please check the link and try
          again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      {trip && (
        <>
          <TripCard isAvailable={true} {...trip} />
        </>
      )}
    </Box>
  );
};

export default SharedTripPage;
