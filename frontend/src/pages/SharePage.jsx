import { Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../contexts/userContext";
import axios from "axios";

const SharePage = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  //check if user is logged in by checking the local storage:

  const user = useContext(userContext);

  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  const tripId = urlParams.get("tripId");
  console.log(tripId);

  const handleAddTrip = async () => {
    try {
      const response = await axios.post("/api/trip/addTrip", {
        tripId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    nav("/login");
  }

  useEffect(() => {
    if (!loading) {
      console.log("test");
      setTimeout(() => {
        nav("/");
      }, 3000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack
          width={"100%"}
          height={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography>Hooray! Your trip has been added!</Typography>
        </Stack>
      )}
    </>
  );
};

export default SharePage;
