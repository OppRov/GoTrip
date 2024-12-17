import "./App.css";
import { UserProvider } from "./contexts/userContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./themes/AppTheme";
import { NextUiProvider } from "@nextui-org/react";

import AppRoutes from "./routes/AppRoutes";
import Stages from "./components/planner/Stages";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <NextUiProvider>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </NextUiProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
