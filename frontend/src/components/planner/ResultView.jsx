import React, { useContext } from "react";
import CalendarDisplay from "../CalendarDisplay";
import { planContext } from "../../contexts/planContext";

const ResultView = () => {
  const { planData } = useContext(planContext);

  return (
    <>
      {planData.destination}
      <CalendarDisplay />
    </>
  );
};

export default ResultView;
