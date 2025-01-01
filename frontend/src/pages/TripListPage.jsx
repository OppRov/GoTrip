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
import Grid from "@mui/material/Grid2";
import { Container } from "@mui/material";
import TripCard from "../components/TripCard";

const TripListPage = () => {
  const [trips, setTrips] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const { data, loading, error, fetchData } = axiosFetch({
    url: `${TRIPS_URL}/getAllTripsUser/${userInfo.id}`,
    method: "GET",
    token: localStorage.getItem("token"),
  });

  const handleExpandClick = (i) => {
    let newArrTrips = [...trips];
    newArrTrips[i] = !trips[i];
    setTrips(newArrTrips);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && !error && data) {
      setTrips(data.data);
    }
  }, [data, loading, error]);

  return (
    <Container sx={{ mt: "1rem" }}>
      <Grid container spacing={5}>
        {trips.map((value, index) => {
          return <TripCard key={index} {...value} />;
        })}
      </Grid>
    </Container>
  );
};

export default TripListPage;
