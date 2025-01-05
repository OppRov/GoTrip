import { Box, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { planContext } from "../../contexts/planContext";
import axiosFetch from "../../api/axiosFetch";
import { TRIPS_URL } from "../../../constants/endpoints";

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
      console.log(data);
      setActivities(data.data.placesResult);
    } else if (error) {
      console.log(error.status);
    }
  }, [data, loading, error]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "fit-content",
        gap: "5px",
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center">
        Stage 2
      </Typography>
    </Box>
  );
};

export default Stage2;
