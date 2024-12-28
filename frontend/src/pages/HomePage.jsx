/* eslint-disable no-unused-vars */
import React from "react";
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

const HomePage = () => {
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
                sx={{ color: theme.palette.tertiary.main }}
              >
                Plan Your Dream Vacation with Ease! Whether you're exploring
                hidden gems, relaxing at luxurious resorts, or embarking on an
                adventure of a lifetime, our trip planner is here to make your
                journey seamless and unforgettable.
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <img src={myImage} alt="" />
            </Box>
          </Stack>
          <Box>
            {/* Reccomendations */}
            <TripCard />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
