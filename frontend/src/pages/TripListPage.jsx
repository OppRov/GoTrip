import { useEffect, useState } from "react";
import axiosFetch from "../api/axiosFetch";
import { TRIPS_URL } from "../../constants/endpoints";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";
import { Button, Container, TextField } from "@mui/material";
import TripCard from "../components/TripCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TripListPage = () => {
  const [trips, setTrips] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const nav = useNavigate();

  const { data, loading, error, fetchData } = axiosFetch();

  useEffect(() => {
    fetchData({
      url: `${TRIPS_URL}/getAllTripsUser/${userInfo?.id}`,
      method: "GET",
      token: localStorage.getItem("token"),
    });
  }, []);

  useEffect(() => {
    if (!loading && !error && data) {
      console.log(data.data);
      setTrips(data.data);
    }
  }, [data, loading, error]);

  const handleDeleteTrip = (tripId) => {
    axios
      .delete(`${TRIPS_URL}/deleteTrip/${tripId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        fetchData({
          url: `${TRIPS_URL}/getAllTripsUser/${userInfo?.id}`,
          method: "GET",
          token: localStorage.getItem("token"),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const newTrips = trips.filter((trip) => {
      const filterd = trip.tripName
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase());
      console.log("SEARCH_VALUE:", searchValue);
      return filterd;
    });
    setTrips(newTrips);
    if (!searchValue) {
      fetchData({
        url: `${TRIPS_URL}/getAllTripsUser/${userInfo?.id}`,
        method: "GET",
        token: localStorage.getItem("token"),
      });
    }
  }, [searchValue]);

  return (
    <Container sx={{ mt: "1rem" }}>
      <TextField
        placeholder="Search Trip Name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        variant="outlined"
      />
      <Button
        variant="contained"
        sx={{ borderRadius: "10px", height: "40px", marginLeft: "55rem" }}
        onClick={() => nav("/planner")}
      >
        Create a new Trip <AddIcon />
      </Button>
      <Grid container spacing={5} marginTop="10px">
        {trips.map((value, index) => {
          return (
            <TripCard
              key={index}
              {...value}
              isAvailable={false}
              onDelete={handleDeleteTrip}
            />
          );
        })}
      </Grid>
    </Container>
  );
};

export default TripListPage;
