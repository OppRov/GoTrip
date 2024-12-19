import { Box, TextField } from "@mui/material";
import { DateRangePicker } from "@nextui-org/react";
import React, { useState } from "react";

const Stage1 = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [days, setDays] = useState(0);

  const handleDatePickerChange = (date) => {
    const startDate = new Date(
      date.start.year,
      date.start.month - 1,
      date.start.day,
    );
    const endDate = new Date(date.end.year, date.end.month - 1, date.end.day);
    setStartDate(startDate);
    setEndDate(endDate);
    setDays((endDate - startDate) / (1000 * 60 * 60 * 24) + 1);
    console.log(days);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        border: "1px solid red",
        width: "fit-content",
        gap: "5px",
      }}
    >
      <h1 className="text-center float">Stage 1</h1>
      <TextField label="Destination" />
      <DateRangePicker
        onChange={handleDatePickerChange}
        className={`bg-${"slate"}-50`}
        isRequired
        label="Trip Duration"
      />
    </Box>
  );
};

export default Stage1;
