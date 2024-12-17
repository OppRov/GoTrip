import React from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import Stages from "../components/planner/Stages";

const HomePage = () => {
  const [trips, setTrips] = useState([]);
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleAddTrip = () => {
    if (tripName && destination && date) {
      setTrips([...trips, { tripName, destination, date }]);
      setTripName("");
      setDestination("");
      setDate("");
    }
  };

  return (
    <>
      {/* Main Content */}
      <Container
        sx={{
          mt: 4,
          width: "100",
          spacing: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          border: "1px solid black",
        }}
      >
        {/* <Stack
          // container
          spacing={4}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
        > */}
        {/* Trip Planner Form */}
        <Stack xs={12} md={6}>
          {/* <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Plan Your Trip
              </Typography>
              <TextField
                label="Trip Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
              />
              <TextField
                label="Destination"
                variant="outlined"
                fullWidth
                margin="normal"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddTrip}
              >
                Add Trip
              </Button>
            </CardActions>
          </Card> */}
          <Stages />
        </Stack>

        {/* Planned Trips */}
        <Stack xs={12} md={6} width={"50%"}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Your Trips
              </Typography>
              {trips.length > 0 ? (
                <List>
                  {trips.map((trip, index) => (
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={trip.tripName}
                        secondary={`${trip.destination} - ${trip.date}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No trips planned yet. Add your first trip!
                </Typography>
              )}
            </CardContent>
          </Card>
        </Stack>
        {/* </Stack> */}
      </Container>
    </>
  );
};

export default HomePage;
