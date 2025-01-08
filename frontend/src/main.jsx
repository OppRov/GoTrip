import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import MapDisplay from "./components/MapDisplay.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
);
