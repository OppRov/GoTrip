import { createContext, useContext, useEffect, useState } from "react";

export const planContext = createContext();

export const PlanProvider = ({ children }) => {
  const [planData, setPlanData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    duration: 0,
    image: "",
  });

  useEffect(() => {
    console.log(planData);
  }, [planData]);

  return (
    <planContext.Provider value={{ planData, setPlanData }}>
      {children}
    </planContext.Provider>
  );
};
