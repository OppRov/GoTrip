import { Box } from "@mui/material";
import React from "react";

const TripCard = ({ props }) => {
  return (
    <>
      <Box>
        <img src={props.image} alt="" />
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </Box>
    </>
  );
};

export default TripCard;
