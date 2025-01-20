import { useEffect, useState } from "react";
import axiosFetch from "../api/axiosFetch";
import { TRIPS_URL } from "../../constants/endpoints";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";
import { Button, Container, TextField } from "@mui/material";
import TripCard from "../components/TripCard";
import { useNavigate } from "react-router-dom";

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
