import { Box, Typography, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { planContext } from "../../contexts/planContext";
import axiosFetch from "../../api/axiosFetch";
import { TRIPS_URL } from "../../../constants/endpoints";
import { Draggable } from "@fullcalendar/interaction";

const Stage2 = () => {
  const { planData, setPlanData } = useContext(planContext);
  const [activities, setActivities] = useState([]);

  //fetch all the availableactivities and display them

  const { data, loading, error, fetchData } = axiosFetch();

  useEffect(() => {
    fetchData({
      url: `${TRIPS_URL}/getGooglePlaces/${planData.destination} tourist activities`,
      method: "GET",
      token: localStorage.getItem("token"),
    });
  }, []);

  useEffect(() => {
    if (!loading && !error && data) {
      const formattedActivities = data.data.placesResult.map((place) => ({
        id: place.place_id,
        title: place.name,
        duration: "01:00", // Default 1 hour duration
        address: place.formatted_address,
      }));
      setActivities(formattedActivities);
    }
  }, [data, loading, error]);

  useEffect(() => {
    // Initialize draggable functionality for external events
    const draggableEl = document.getElementById("external-events");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          return JSON.parse(eventEl.dataset.event);
        },
      });
    }
  }, [activities]); // Re-run when activities change

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        height: "100%",
        gap: "5px",
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center">
        Available Activities
      </Typography>

      <Box
        id="external-events"
        sx={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "calc(100vh - 150px)", // Adjust this value based on your needs
          padding: "10px",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {activities.map((activity) => (
          <Paper
            key={activity.id}
            className="fc-event"
            data-event={JSON.stringify({
              id: activity.id,
              title: activity.title,
              duration: activity.duration,
              extendedProps: {
                address: activity.address,
              },
            })}
            sx={{
              p: 2,
              m: 1,
              cursor: "move",
              backgroundColor: "#f5f5f5",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <Typography>{activity.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {activity.address}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Stage2;
