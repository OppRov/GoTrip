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

const TripCard = ({ image, destination, activities, title, preview }) => {
  //Add to user's trips
  const { data, loading, error, fetchData } = axiosFetch();

  const handleAddTrip = () => {
    console.log("adding trip");
    fetchData({
      url: TRIPS_URL,
      method: "POST",
      token: localStorage.getItem("token"),
    });
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
      >
        <CardContent
          sx={{ p: 1, display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <CardMedia>
            <img
              onError={(e) => {
                e.target.src =
                  "https://dispatcheseurope.com/wp-content/uploads/2016/05/Berlin2.jpg";
              }}
              src={image}
              alt=""
              style={{ borderRadius: "10px" }}
              className="w-full h-40 object-fill"
            />
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
            <Typography variant="h4">{title}</Typography>
            <Typography variant="h5">Destination: {destination}</Typography>
            <Typography variant="h5">Activities: {activities}</Typography>

            <Button
              variant="contained"
              onClick={handleAddTrip}
              sx={{ width: "100%" }}
            >
              Add to trips
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default TripCard;
