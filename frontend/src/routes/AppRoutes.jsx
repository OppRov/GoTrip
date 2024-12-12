import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResponsiveAppBar />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
