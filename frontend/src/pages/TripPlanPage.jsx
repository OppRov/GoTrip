import { Box } from "@mui/material";
import React, { useState } from "react";

const TripPlanPage = () => {
  const [currentTrip, setCurrentTrip] = useState({});
  const [currentStage, setCurrentStage] = useState(0);

  return (
    <>
      <Box sx={{ width: "100%", height: "100%" }}>
        <h1>Plan your trip</h1>
      </Box>
    </>
  );
};

export default TripPlanPage;
