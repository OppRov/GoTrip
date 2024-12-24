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
} from "@mui/material";
import { useState } from "react";
import Stages from "../components/planner/Stages";

const HomePage = () => {
  return (
    <>
      <Container>
        <Typography variant="h2" component="h1" textAlign="center">
          Home
        </Typography>
      </Container>
    </>
  );
};

export default HomePage;
