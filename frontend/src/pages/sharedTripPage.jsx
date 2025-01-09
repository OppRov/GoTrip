import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import axiosFetch from "../api/axiosFetch";
import { TRIPS_URL } from "../../constants/endpoints";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

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
          <Typography variant="h4" gutterBottom>
            {trip.tripName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Location: {trip.location}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Dates: {new Date(trip.fromDate).toLocaleDateString()} -{" "}
            {new Date(trip.toDate).toLocaleDateString()}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Budget: ${trip.budget}
          </Typography>

          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Trip Itinerary
            </Typography>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridDay"
              events={trip.events}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              height="auto"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default SharedTripPage;
