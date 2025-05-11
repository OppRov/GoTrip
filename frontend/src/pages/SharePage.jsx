import { Button, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../contexts/userContext";
import axios from "axios";

const SharePage = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //check if user is logged in by checking the local storage:

  const user = useContext(userContext);

  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  const tripId = urlParams.get("tripId");

  const handleAddTrip = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/trips/duplicateTripForUser",
        {
          tripID: tripId,
          userID: JSON.parse(localStorage.getItem("userInfo")).id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    handleAddTrip();
  }, []);

  if (!user) {
    nav("/login");
  }

  //this is to redirect the user to the home page when the trip is added
  useEffect(() => {
    if (!loading) {
      nav("/trips");
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : !error ? (
        <Stack
          width={"100%"}
          height={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography>Hooray! Your trip has been added!</Typography>
          <Button onClick={() => nav("/trips")}>View Trips</Button>
        </Stack>
      ) : (
        <Typography>Something went wrong!</Typography>
      )}
    </>
  );
};

export default SharePage;
