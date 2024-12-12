import "./App.css";
import { UserProvider } from "./contexts/userContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./themes/AppTheme";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
