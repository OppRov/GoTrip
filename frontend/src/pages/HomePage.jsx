/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { useState } from "react";
import Stages from "../components/planner/Stages";

import myImage from "../assets/public/Group 2.png";
import { theme } from "../themes/AppTheme";
import TripCard from "../components/TripCard";
import { useNavigate } from "react-router-dom";
import axiosFetch from "../api/axiosFetch";
import { TRIPS_URL } from "../../constants/endpoints";

const HomePage = () => {
  const nav = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const { data, loading, error, fetchData } = axiosFetch();

  useEffect(() => {
    fetchData({
      url: `${TRIPS_URL}/getRecommendedTrips`,
      method: "GET",
    });
  }, []);

  useEffect(() => {
    if (!loading && !error && data) {
      console.log(data);
    }
  }, [data, loading, error]);

  const handlePlanClick = () => {
    //check if user is logged in by sending a request
  };

  return (
    <>
      <Container>
        {/* <Typography variant="h2" component="h1" textAlign="center">
          Home
        </Typography> */}
        <Box>
          <Stack direction={"row"} sx={{ mt: "5rem" }}>
            <Box sx={{ width: "50%" }}>
              <Typography
                variant="h2"
                component="h1"
                // textAlign="center"
                sx={{ color: theme.palette.primary.main }}
              >
                Plan Your Trip
              </Typography>
              <Typography
                variant="h5"
                component="h1"
                // textAlign="center"
                sx={{ color: theme.palette.tertiary.main, fontFamily: "Arial" }}
              >
                Plan Your Dream Vacation with Ease! Whether you're exploring
                hidden gems, relaxing at luxurious resorts, or embarking on an
                adventure of a lifetime, our trip planner is here to make your
                journey seamless and unforgettable.
              </Typography>
              <Box>
                <Button variant="contained" onClick={handlePlanClick}>
                  Plan your next trip!
                </Button>
              </Box>
            </Box>
            <Box sx={{ width: "50%" }}>
              <img src={myImage} alt="" />
            </Box>
          </Stack>
          <Box
            sx={{
              display: "flex",
              gap: "50px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* Reccomendations section */}

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginBottom: "25px",
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                textAlign="center"
                sx={{ color: theme.palette.primary.main, marginBottom: "25px" }}
              >
                Recommended Trips
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "50px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <TripCard />
                <TripCard />
                <TripCard />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
