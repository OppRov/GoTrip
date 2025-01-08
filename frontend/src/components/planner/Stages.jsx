import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { DateRangePicker, DateRangePickerField } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { SystemColors } from "../../themes/SystemColors";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";

const StageList = [
  //Stage 1 destination selection and trip duration selection
  <Stage1 />,

  //Stage 2 budget definition
  <Stage2 />,

  <Stage3 />,
  <Stage4 />,
];

//Page through the stages with a next and back button at the bottom
const Stages = ({ currentStage, setCurrentStage }) => {
  //Keep the stage between 0 and the number of stages
  useEffect(() => {
    if (currentStage < 0) setCurrentStage(0);
    else if (currentStage > StageList.length - 1)
      setCurrentStage(StageList.length - 1);
  }, [currentStage]);

  return <>{StageList[currentStage]}</>;
};

export default Stages;
