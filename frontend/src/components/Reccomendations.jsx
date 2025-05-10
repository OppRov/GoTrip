import React, { useEffect, useState } from "react";
import axiosFetch from "../api/axiosFetch";
import { TRIPS_URL } from "../../constants/endpoints";
import TripCard from "./TripCard";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { theme } from "../themes/AppTheme";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const Reccomendations = () => {
  const [reccomendedTrips, setRecommendedTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleTrips, setVisibleTrips] = useState([]);

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
      setRecommendedTrips(data.data);
      setCurrentPage(1);
    }
  }, [data, loading, error]);

  const handlePrev = () => {
    if (currentPage <= 1)
      setCurrentPage(Math.round(reccomendedTrips.length / 3));
    else setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    if (currentPage >= reccomendedTrips.length / 3) setCurrentPage(1);
    else setCurrentPage((prevPage) => prevPage + 1);
    // console.log(currentPage);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * 3;
    const endIndex = startIndex + 3;
    const visibleTrips = reccomendedTrips.slice(startIndex, endIndex);
    setVisibleTrips(visibleTrips);
  }, [currentPage]);

  return (
    <>
      {reccomendedTrips.length > 0 && (
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
            sx={{
              color: theme.palette.primary.main,
              marginBottom: "25px",
            }}
          >
            Recommended Trips
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "50px",
              justifyContent: "space-between",
              alignItems: "center",
              //   flexWrap: "wrap",
            }}
          >
            <IconButton
              //   disabled={currentPage === 1}
              onClick={() => handlePrev()}
              size="large"
              color="primary"
            >
              <NavigateBeforeIcon fontSize="inherit" />
            </IconButton>

            {visibleTrips.map((trip, i) => (
              <TripCard key={i} {...trip} />
            ))}
            <IconButton
              //   disabled={currentPage === reccomendedTrips.length / 3}
              onClick={() => handleNext()}
              color="primary"
              size="large"
            >
              <NavigateNextIcon fontSize="inherit" />
            </IconButton>
          </Box>
          {/* <div>{currentPage}</div> */}
        </Box>
      )}
    </>
  );
};

export default Reccomendations;
