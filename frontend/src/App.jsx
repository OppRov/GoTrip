import "./App.css";
import { UserProvider } from "./contexts/userContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./themes/AppTheme";
import { NextUIProvider } from "@nextui-org/react";

import AppRoutes from "./routes/AppRoutes";
import Stages from "./components/planner/Stages";
import TripPlanPage from "./pages/TripPlanPage";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <NextUIProvider>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </NextUIProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
