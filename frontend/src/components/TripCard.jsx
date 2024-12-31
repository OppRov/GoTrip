import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { theme } from "../themes/AppTheme";
import LoadingOverlay from "./LoadingOverlay";
import axiosFetch from "../api/axiosFetch";
import { TRIPS_URL } from "../../constants/endpoints";

const TripCard = ({ image, destination, activities }) => {
  const [tripData, setTripData] = useState({
    title: "title",
    destination: "dest",
    activities: "act",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
  });
  //Add to user's trips
  const { data, loading, error, fetchData } = axiosFetch({
    url: TRIPS_URL,
    method: "POST",
    token: localStorage.getItem("token"),
  });

  const handleAddTrip = () => {
    console.log("adding trip");
    fetchData();
  };

  useEffect(() => {
    if (!loading && !error && data) {
      console.log("test");
      console.log(data);
    } else if (error) {
      console.log(error.status);
    }
  }, [data, loading, error]);

  return (
    <>
      <LoadingOverlay open={false} />
      <Card
        sx={{
          width: 280,
          background: theme.palette.tertiary.main,
          borderRadius: "10px",
          height: "400px",
          p: 0,
        }}
        onClick={handleAddTrip}
      >
        <CardContent
          sx={{ p: 1, display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <CardMedia>
            <Box sx={{ width: "100%", height: "175px" }}>
              <img
                src={tripData.image}
                alt=""
                width={"100%"}
                style={{ borderRadius: "10px" }}
              />
            </Box>
          </CardMedia>

          <Box
            sx={{
              borderRadius: "10px",
              background: "white",
              marginTop: "10px",
              height: "188px",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">{tripData.title}</Typography>
            <Typography variant="h5">
              Destination: {tripData.destination}
            </Typography>
            <Typography variant="h5">
              Activities: {tripData.activities}
            </Typography>

            <Button variant="contained" sx={{ width: "100%" }}>
              Add to trips
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default TripCard;
