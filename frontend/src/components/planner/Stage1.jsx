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
    console.log("date updated");
    const start = new Date(
      date.start.year,
      date.start.month - 1,
      date.start.day,
    ).toLocaleDateString("en-CA");
    const end = new Date(
      date.end.year,
      date.end.month - 1,
      date.end.day,
    ).toLocaleDateString("en-CA");
    console.log("test", startDate, endDate);

    setPlanData({ ...planData, startDate: start, endDate: end });
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
        width: "fit-content",
        gap: "15px",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        textAlign="center"
        marginBottom={2}
      >
        Stage 1
      </Typography>
      <Autocomplete
        onInputChange={(e, value) =>
          setPlanData({ ...planData, destination: value })
        }
        value={planData.destination}
        disablePortal
        id="combo-box-demo"
        options={destinations}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Destination" />}
      />
      <DateRangePicker
        calendarProps={{
          classNames: {
            base: "bg-slate-300",
            pickerWrapper: "bg-slate-300",
            cellButton: [
              "data-[today=true]:bg-default-100 data-[selected=true]:bg-transparent rounded-small",
              // start (pseudo)
              "data-[range-start=true]:before:rounded-l-small",
              "data-[selection-start=true]:before:rounded-l-small",
              // end (pseudo)
              "data-[range-end=true]:before:rounded-r-small",
              "data-[selection-end=true]:before:rounded-r-small",
              // start (selected)
              "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-small",
              "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-orange-500",
              // end (selected)
              "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-small",
              "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-orange-500",
            ],
          },
        }}
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
