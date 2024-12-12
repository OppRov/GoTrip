import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResponsiveAppBar />}></Route>
          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
