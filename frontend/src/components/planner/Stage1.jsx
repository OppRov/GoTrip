import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Box, TextField, Typography } from "@mui/material";
import { DateRangePicker } from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import { planContext } from "../../contexts/planContext";

const Stage1 = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [days, setDays] = useState(0);

  const { setPlanData, planData } = useContext(planContext);

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
    setPlanData({ ...planData, destination: e.target.value });
  };

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
      <TextField onChange={handleChange} label="Destination" />
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