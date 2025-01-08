import { Typography } from "@mui/material";
import React, { useContext } from "react";
import axiosFetch from "../../api/axiosFetch";
import { planContext } from "../../contexts/planContext";
import { fromDate } from "@internationalized/date";
import MapDisplay from "../MapDisplay";

const Stage3 = () => {
  const { data, loading, error, fetchData } = axiosFetch();
  const { planData, setPlanData } = useContext(planContext);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleCreateTrip = () => {
    fetchData({
      url: TRIPS_URL,
      method: "POST",
      token: localStorage.getItem("token"),
      body: {
        userID: userInfo?.id,
        tripName: planData.title,
        fromDate: planData.startDate,
        toDate: planData.endDate,
        budget: planData.budget,
        destination: planData.destination,
        itinerary: planData.itinerary,
        recommended: false,
        ratingCount: 0,
        tripImage: planData.image,
      },
    });
  };

  return (
    <>
      <Typography variant="h4">Stage 3</Typography>
      <MapDisplay />
    </>
  );
};

export default Stage3;
