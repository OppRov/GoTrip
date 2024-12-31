import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { DateRangePicker } from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import { planContext } from "../../contexts/planContext";

const Stage1 = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [days, setDays] = useState(0);

  const { setPlanData, planData } = useContext(planContext);

  const destinations = [
    "Rio de Janeiro, Brazil",
    "San Francisco, USA",
    "Barcelona, Spain",
    "Maldives",
    "Mykonos, Greece",
    "Bruges, Belgium",
    "Galapagos Islands, Ecuador",
    "Bora Bora, French Polynesia",
    "Montreal, Canada",
    "Berlin, Germany",
    "Rome, Italy",
    "Prague, Czech Republic",
    "Agra, India",
    "Cape Town, South Africa",
    "Interlaken, Switzerland",
    "Marrakech, Morocco",
    "Jerusalem, Israel",
    "Vancouver, Canada",
    "Athens, Greece",
    "Madrid, Spain",
    "Petra, Jordan",
    "New York City, USA",
    "Kyoto, Japan",
    "Vienna, Austria",
    "Boracay, Philippines",
    "Siem Reap, Cambodia",
    "Florence, Italy",
    "Delhi, India",
    "Bali, Indonesia",
    "Santorini, Greece",
    "Buenos Aires, Argentina",
    "Cancun, Mexico",
    "Queenstown, New Zealand",
    "Machu Picchu, Peru",
    "Cairo, Egypt",
    "Chichen Itza, Mexico",
    "Istanbul, Turkey",
    "Copenhagen, Denmark",
    "New Zealand",
    "Ibiza, Spain",
    "Phuket, Thailand",
    "Dubai, UAE",
    "Seville, Spain",
    "Lisbon, Portugal",
    "Melbourne, Australia",
    "Reykjavik, Iceland",
    "Sydney, Australia",
    "Seoul, South Korea",
    "Hawaii, USA",
    "Lucerne, Switzerland",
    "Bangkok, Thailand",
    "London, UK",
    "Paris, France",
    "Amsterdam, Netherlands",
    "Budapest, Hungary",
    "Dublin, Ireland",
    "Patagonia, Argentina & Chile",
    "Krakow, Poland",
    "Toronto, Canada",
    "Fiji",
    "Singapore",
    "Chicago, USA",
    "Tokyo, Japan",
  ];

  const handleDatePickerChange = (date) => {
    const startDate = new Date(
      date.start.year,
      date.start.month - 1,
      date.start.day,
    ).toLocaleDateString("en-CA");
    const endDate = new Date(
      date.end.year,
      date.end.month - 1,
      date.end.day + 1,
    ).toLocaleDateString("en-CA");
    setStartDate(startDate);
    setEndDate(endDate);
    setDays((endDate - startDate) / (1000 * 60 * 60 * 24) + 1);
    console.log(days);
  };
  useEffect(() => {
    if (!startDate || !endDate) return;
    setPlanData({ ...planData, duration: days, startDate, endDate });
  }, [days]);

  const handleChange = (e) => {
    setPlanData({ ...planData, destination: e.target.innerText });
  };

  useEffect(() => {
    console.log(planData);
  }, [planData]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        // border: "1px solid red",
        width: "fit-content",
        gap: "5px",
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center">
        Stage 1
      </Typography>
      <Autocomplete
        onChange={handleChange}
        disablePortal
        id="combo-box-demo"
        options={destinations}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Destination" />}
      />
      {/* <TextField onChange={handleChange} label="Destination" /> */}
      <DateRangePicker
        onChange={handleDatePickerChange}
        // className={`bg-${"slate"}-50`}
        isRequired
        minValue={today(getLocalTimeZone())}
        label="Trip Duration"
      />
    </Box>
  );
};

export default Stage1;
