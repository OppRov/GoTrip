import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  CardActions,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TripCard = ({
  _id,
  imageTrip,
  location,
  events,
  tripName,
  fromDate,
  toDate,
  budget,
  preview,
  isAvailable = true,
  ratingCount,
  planData,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const displayImage = preview
    ? planData?.image || "https://placehold.co/345x140/e0e0e0/ffffff"
    : imageTrip;
  const displayTripName = preview || !tripName ? planData?.tripName : tripName;

  return (
    <Paper elevation={3} sx={{ width: "300px" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
      >
        <CardMedia
          component="img"
          height={140}
          image={displayImage}
          alt={location || "Trip Image"}
          sx={{
            objectFit: "cover",
            height: "140px",
            width: "300px",
          }}
        />
        <CardContent sx={{ flexGrow: 1, pt: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {displayTripName}
          </Typography>
        </CardContent>
        {!preview && (
          <IconButton
            onClick={handleToggleExpand}
            aria-expanded={expanded}
            aria-label="expand"
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              alignSelf: "center",
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom noWrap>
              {location}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {fromDate && toDate ? (
                <>
                  {new Date(fromDate).toLocaleDateString()} -{" "}
                  {new Date(toDate).toLocaleDateString()}
                </>
              ) : (
                "Dates not set"
              )}
            </Typography>
            {budget > 0 && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Budget: ${budget}
              </Typography>
            )}
            {(events || [])?.slice(0, 2).map((event, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {new Date(event.start).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" noWrap>
                  {new Date(event.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" - "}
                  {event.title}
                </Typography>
              </Box>
            ))}
            {events?.length > 2 && (
              <Typography variant="body2" color="primary">
                +{events.length - 2} more events
              </Typography>
            )}
          </CardContent>
          <CardActions sx={{ p: 2, pt: 0 }}>
            <Button
              variant="contained"
              onClick={isAvailable ? () => {} : undefined}
              fullWidth
              size="small"
              disabled={!isAvailable}
            >
              {isAvailable ? "Add to trips" : "Share"}
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    </Paper>
  );
};

export default TripCard;
