import React, { useContext, useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { planContext } from "../contexts/planContext";
import {
  Button,
  IconButton,
  Select,
  MenuItem,
  Box,
  Typography,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  DirectionsCar,
  DirectionsWalk,
} from "@mui/icons-material";

const MapDisplay = () => {
  const { planData } = useContext(planContext);
  const [center, setCenter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");

  // Group events by date using start time
  const eventsByDate = planData?.events
    ? planData.events.reduce((acc, event) => {
        if (!event?.start) return acc;
        const date = event.start.split("T")[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push({
          ...event,
          location: event.address,
        });
        return acc;
      }, {})
    : {};

  const dates = Object.keys(eventsByDate).sort();

  // Set initial selected date if not set and dates are available
  useEffect(() => {
    if (!selectedDate && dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);

  const currentDayEvents = selectedDate ? eventsByDate[selectedDate] : [];
  const currentDateIndex = dates.indexOf(selectedDate);

  const handlePrevDay = () => {
    const newIndex = (currentDateIndex - 1 + dates.length) % dates.length;
    setSelectedDate(dates[newIndex]);
  };

  const handleNextDay = () => {
    const newIndex = (currentDateIndex + 1) % dates.length;
    setSelectedDate(dates[newIndex]);
  };

  // Format date for display (e.g., "January 8, 2025")
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  console.log("planData:", planData); // Debug log
  console.log("eventsByDate:", eventsByDate); // Debug log
  console.log("firstDayEvents:", currentDayEvents); // Debug log

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        p: { xs: 1, sm: 2 },
      }}
    >
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={["geocoding", "routes"]}
      >
        <GeocodingComponent
          destination={planData?.destination}
          setCenter={setCenter}
        />
        {center && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <IconButton
                onClick={handlePrevDay}
                disabled={dates.length <= 1}
                color="primary"
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h6">
                {selectedDate ? formatDate(selectedDate) : "Loading..."}
              </Typography>
              <IconButton
                onClick={handleNextDay}
                disabled={dates.length <= 1}
                color="primary"
              >
                <ArrowForward />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Select
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
                size="small"
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="DRIVING">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemIcon>
                      <DirectionsCar fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Driving</ListItemText>
                  </Box>
                </MenuItem>
                <MenuItem value="WALKING">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemIcon>
                      <DirectionsWalk fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Walking</ListItemText>
                  </Box>
                </MenuItem>
              </Select>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: { xs: "250px", sm: "300px" },
                borderRadius: 1,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                "& > div": {
                  width: "100% !important",
                  height: "100% !important",
                },
              }}
            >
              <Map
                defaultCenter={center}
                defaultZoom={13}
                gestureHandling={"greedy"}
                fullscreenControl={false}
                streetViewControl={false}
                zoomControl={true}
                mapTypeControl={false}
              >
                {currentDayEvents.length > 1 && (
                  <Directions
                    key={`${selectedDate}-${travelMode}`}
                    events={currentDayEvents}
                    travelMode={travelMode}
                  />
                )}
              </Map>
            </Box>
          </>
        )}
        {!center && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "250px", sm: "300px" },
            }}
          >
            <Typography>Loading map...</Typography>
          </Box>
        )}
      </APIProvider>
    </Box>
  );
};

// Separate component to handle geocoding
const GeocodingComponent = ({ destination, setCenter }) => {
  const geocodingLibrary = useMapsLibrary("geocoding");

  useEffect(() => {
    const getCityCoordinates = async () => {
      if (!geocodingLibrary) return;

      const geocoder = new geocodingLibrary.Geocoder();

      try {
        const response = await geocoder.geocode({
          address: destination || "Tel Aviv",
        });
        const { location } = response.results[0].geometry;
        const lat = location.lat();
        const lng = location.lng();

        if (isFinite(lat) && isFinite(lng)) {
          setCenter({ lat, lng });
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    };

    getCityCoordinates();
  }, [geocodingLibrary, destination, setCenter]);

  return null;
};

// Update Directions component to clean up properly
function Directions({ events, travelMode }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  // Set up the directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;

    const renderer = new routesLibrary.DirectionsRenderer({ map });
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(renderer);

    return () => {
      renderer.setMap(null);
    };
  }, [routesLibrary, map]);

  // Update the route when events or travel mode change
  useEffect(() => {
    if (!directionsService || !directionsRenderer || events.length < 2) return;

    const origin = events[0].location;
    const destination = events[events.length - 1].location;
    const waypoints = events.slice(1, -1).map((event) => ({
      location: event.location,
      stopover: true,
    }));

    directionsService
      .route({
        origin,
        destination,
        waypoints,
        travelMode: routesLibrary.TravelMode[travelMode],
        optimizeWaypoints: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((error) => {
        console.error("Directions request failed:", error);
      });
  }, [
    directionsService,
    directionsRenderer,
    events,
    routesLibrary,
    travelMode,
  ]);

  return null;
}

export default MapDisplay;
