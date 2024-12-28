import "./App.css";
import { UserProvider } from "./contexts/userContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./themes/AppTheme";
import { NextUIProvider } from "@nextui-org/react";

import AppRoutes from "./routes/AppRoutes";
import Stages from "./components/planner/Stages";
import TripPlanPage from "./pages/TripPlanPage";
import TripCard from "./components/TripCard";

function App() {
  return (
    <>
      {/* <ThemeProvider theme={theme}>
        <NextUIProvider>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </NextUIProvider>
      </ThemeProvider> */}
      <TripCard />
    </>
  );
}

export default App;
