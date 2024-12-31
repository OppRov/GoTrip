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
  const [trips, setTrips] = useState(new Array(6).fill(false));

  const { data, loading, error, fetchData } = axiosFetch({
    url: TRIPS_URL,
    method: "GET",
    token:
      "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsYXphcjI1MkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR4NGZjQ3hNa2MxbmdYYmljSnFhVER1eWNIWlJpWTQzSHFjc2dNc3AwM1ZuaWVueEhTTXhEYSIsImlhdCI6MTczNTEyMDQ1NiwiZXhwIjoxNzM1MTI3NjU2fQ.LQ93lgWrfxJ8MwRQEZUOqlGIpeenThUg4AVjVOytGMrVOitKPmSnyPuUvXyaSQXRhi1NBKCc1x2J0Bu_yXOVaxcdmJ57scsGXrc-kMJIPBu1DqhUXIwjjcfa8-hoXKg4Nf2QT_C_cZQK1B1V2QB7yOh9Akm9RgWuBATkvdqwMyYDTl1XecKLc_eGdaappwIbeu53x9nD2XpRKUVLT_RcwD6DJmPMDwK1Y1yt6TQIS2EeuYWFUwjUX48iNyG9cb5DiTQmuwgDs5VAyqryTZVf-Hk9h79VhPByjHEWIE_xdJJr_jQnupj27iliTz_vf5Zq8urG9V8KNTokqRFMKAa0S99M6sJ0eAoZwI9gLEgiiNOeYFv6_1xwwkXL6UD2NrFy0YhH6IMNAqPxj4tg0qjghT0cL2lKHQI69PKlaZW5VZyG15QKrut8JVUJq028ajMpXpyelAb8QREfmv9aILALzKRa2D_yN544ahHt5LwCtlPPInLuQrBf3rrw3ZhT-1EYRLM7q4yX9Y8yqhsvqFoWQej2sKBVxtC5nELmsowE4fSSA3pALPMf6pwptNmb6st_sobwcyfZz5iRmoxvITbxUbbafnJeTPCOIJ1Keg4wz_eslp1eys5Zi-DuNhwWTnIu6dAQfi91H9h8h5eMNNiYkQ6ugO960IxT7q0qalBUtUk",
  });

  const handleExpandClick = (i) => {
    let newArrTrips = [...trips];
    newArrTrips[i] = !trips[i];
    setTrips(newArrTrips);
  };

  useEffect(() => {
    async function getData() {
      await fetchData();
      console.log("data", data);
      if (!loading && data) {
        setTrips(data.data.trips);
      }
    }
    getData();
  }, []);

  return (
    <Container sx={{ mt: "1rem" }}>
      <Grid container spacing={5}>
        {trips.map((value, index) => {
          return <TripCard />;
        })}
      </Grid>
    </Container>
  );
};

export default TripListPage;
