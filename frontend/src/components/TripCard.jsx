/* eslint-disable */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  CardActions,
} from "@mui/material";
import React, { useEffect } from "react";
import { theme } from "../themes/AppTheme";
import LoadingOverlay from "./LoadingOverlay";
import axiosFetch from "../api/axiosFetch";
import { TRIPS_URL } from "../../constants/endpoints";

const TripCard = ({
  _id,
  imageTrip,
  destination,
  itinerary,
  tripName,
  preview,
  isAvailable = true,
  ratingCount,
}) => {
  const { data, loading, error, fetchData } = axiosFetch();

  const handleAddTrip = () => {
    fetchData({
      url: TRIPS_URL,
      method: "POST",
      token: localStorage.getItem("token"),
    });
  };

  const handleShareTrip = () => {
    fetchData({
      url: TRIPS_URL,
      method: "PUT",
      body: {
        _id,
        ratingCount: ratingCount + 1,
        recommended: true,
      },
      token: localStorage.getItem("token"),
    });
  };

  // Preview placeholder data
  const previewData = {
    image: "https://placehold.co/345x140/e0e0e0/ffffff",
    tripName: "",
    destination: "Location",
    itinerary: [
      {
        date: new Date(),
        events: [
          { time: "09:00", name: "Event 1" },
          { time: "14:00", name: "Event 2" },
        ],
      },
      {
        date: new Date(Date.now() + 86400000),
        events: [
          { time: "10:00", name: "Event 1" },
          { time: "15:00", name: "Event 2" },
        ],
      },
    ],
  };

  // Use preview data or actual data
  const displayImage = preview || !imageTrip ? previewData.image : imageTrip;
  const displayTripName =
    preview || !tripName ? previewData.tripName : tripName;
  const displayDestination =
    preview || !destination ? previewData.destination : destination;
  const displayItinerary =
    preview || !itinerary ? previewData.itinerary : itinerary;

  return (
    <Paper elevation={3} sx={{ height: "100%", width: "300px" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "300px",
          minWidth: "300px",
          maxWidth: "300px",
          opacity: preview ? 0.7 : 1,
        }}
      >
        <CardMedia
          component="img"
          height={140}
          width={300}
          image={displayImage}
          alt={displayDestination}
          sx={{
            objectFit: "cover",
            bgcolor: preview ? "grey.200" : "inherit",
            height: "140px",
            minHeight: "140px",
            maxHeight: "140px",
            width: "300px",
            minWidth: "300px",
            maxWidth: "300px",
          }}
        />
        <CardContent sx={{ flexGrow: 1, pt: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            noWrap
            sx={{ bgcolor: preview ? "grey.100" : "inherit" }}
          >
            {displayTripName}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            gutterBottom
            noWrap
            sx={{ bgcolor: preview ? "grey.100" : "inherit" }}
          >
            {displayDestination}
          </Typography>

          {(displayItinerary || [])?.slice(0, 2).map((event, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {new Date(event.start).toLocaleDateString()}
              </Typography>
              <Typography
                variant="body2"
                noWrap
                sx={{ bgcolor: preview ? "grey.100" : "inherit" }}
              >
                {new Date(event.start).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                - {event.title}
              </Typography>
            </Box>
          ))}
          {displayItinerary?.length > 2 && (
            <Typography variant="body2" color="primary">
              +{displayItinerary.length - 2} more events
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            variant="contained"
            onClick={
              preview
                ? undefined
                : isAvailable
                  ? handleAddTrip
                  : handleShareTrip
            }
            fullWidth
            size="small"
            disabled={preview && !isAvailable}
          >
            {isAvailable ? "Add to trips" : "Share"}
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default TripCard;
