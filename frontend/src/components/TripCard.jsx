import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";

const TripCard = ({ image, destination, activities }) => {
  const [tripData, setTripData] = useState({
    destination: "dest",
    activities: "act",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
  });

  return (
    <>
      <Card sx={{ maxWidth: 300 }}>
        <CardContent>
          <CardMedia>
            <img src={tripData.image} alt="" width={"100%"} />
          </CardMedia>
          <Typography>Destination: {tripData.destination}</Typography>
          <Typography>Activities: {tripData.activities}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default TripCard;
