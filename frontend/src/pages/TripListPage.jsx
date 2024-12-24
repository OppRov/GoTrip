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

const TripListPage = () => {
  const [trips, setTrips] = useState(new Array(6).fill(false));
  const { data, loading, error, fetchData } = axiosFetch({
    url: TRIPS_URL,
    method: "GET",
  });

  const handleExpandClick = (i) => {
    let newArrTrips = [...trips];
    newArrTrips[i] = !trips[i];
    setTrips(newArrTrips);
  };

  useEffect(() => {
    // Need a fetch to API that will give me and indication about the trips.
    //fetchData();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      setTrips(data.data.trips);
    }
  }, [data, loading, error]);

  return (
    <Container sx={{ mt: "1rem" }}>
      <Grid container spacing={5}>
        {trips.map((value, index) => {
          return (
            <Grid item key={index}>
              <Card sx={{ maxWidth: 345 }} key={index}>
                <CardHeader
                  // avatar={
                  // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  //     R
                  // </Avatar>
                  // }
                  // action={
                  //     <IconButton aria-label="settings">
                  //         <MoreVertIcon />
                  //     </IconButton>
                  // }
                  title="Trip - A1"
                  // subheader="September 14, 2016"
                />

                <CardMedia
                  component="img"
                  height="194"
                  image="src/assets/public/francePalace.jpeg"
                  alt="Paella dish"
                />

                {/* <CardContent>
                                        CardContent
                                    </CardContent> */}

                <CardActions disableSpacing>
                  <ExpandMore
                    expand={trips[index]}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={trips[index]}
                    aria-label="show more"
                  ></ExpandMore>
                </CardActions>

                <Collapse in={trips[index]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography>Hello World!</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default TripListPage;
