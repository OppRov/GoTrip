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
  Modal,
  TextField,
  Link,
  Snackbar,
  Rating
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { TRIPS_URL } from "../../constants/endpoints";

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
  userID,
  rating
}) => {
  const [expanded, setExpanded] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    message: "Link copied to clipboard",
    data: false
  });

  const handleOpenShare = () => {
    setOpenShareModal(true);
  };

  const handleToggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://example.com/trip/${_id}`);
    "Link copied to clipboard"
    setOpenSnackbar({
        message: "Link copied to clipboard",
        data: true
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar({
        message: "Link copied to clipboard",
        data: false
    });
  };

  const displayImage = preview
    ? planData?.image || "https://placehold.co/345x140/e0e0e0/ffffff"
    : imageTrip;
  const displayTripName = preview || !tripName ? planData?.tripName : tripName;

  const onSelectRatingTrip = async (e) => {
      const tripData = {
          _id: _id,
          userID: userID,
          rating: e.target.value
      };
      const d = await fetch(TRIPS_URL, {
          method: "PUT",
          body: JSON.stringify(tripData),
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      });
      const dJSON = await d.json();
      console.log(dJSON);
      if (dJSON.status === 201) setOpenSnackbar({
        message: dJSON.message,
        data: dJSON.data
      });
  };

  return (
    <Paper elevation={3} sx={{ width: "300px" }}>
      <Modal open={openShareModal} onClose={() => setOpenShareModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Share Trip
          </Typography>
          <TextField
            label="Trip URL"
            value={`https://example.com/trip/${_id}`}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton edge="end" onClick={handleCopyLink}>
                  <ContentCopyIcon />
                </IconButton>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Typography>
            Share this link with others to invite them to view or collaborate on
            this trip.
          </Typography>
        </Box>
      </Modal>

      <Snackbar
            open={openSnackbar.data}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message={openSnackbar.message}
      />

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
            <ExpandMoreIcon sx={{ color: "primary.main" }} />
          </IconButton>
        )}
        {!preview && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography
                variant="h6"
                color="text.secondary"
                gutterBottom
                noWrap
              >
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
              <Rating onChange={onSelectRatingTrip} value={parseFloat(rating)}/>
              <Button
                variant="contained"
                onClick={handleOpenShare}
                fullWidth
                size="small"
                // disabled={!isAvailable}
              >
                {isAvailable ? "Add to trips" : "Share"}
              </Button>
            </CardActions>
          </Collapse>
        )}
        {preview && (
          <>
            <CardContent>
              <Typography
                variant="h6"
                color="text.secondary"
                gutterBottom
                noWrap
              >
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
              {(planData.events || [])?.slice(0, 2).map((event, index) => (
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
              {planData.events?.length > 2 && (
                <Typography variant="body2" color="primary">
                  +{planData.events.length - 2} more events
                </Typography>
              )}
            </CardContent>
            {/* <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                variant="contained"
                onClick={isAvailable ? () => {} : undefined}
                fullWidth
                size="small"
                disabled={!isAvailable}
              >
                {isAvailable ? "Add to trips" : "Share"}
              </Button>
            </CardActions> */}
          </>
        )}
      </Card>
    </Paper>
  );
};

export default TripCard;
