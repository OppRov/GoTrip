import { createContext, useContext, useState } from "react";

export const planContext = createContext();

export const PlanProvider = ({ children }) => {
  const [planData, setPlanData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    duration: 0,
  });

  return (
    <planContext.Provider value={{ planData, setPlanData }}>
      {children}
    </planContext.Provider>
  );
};
