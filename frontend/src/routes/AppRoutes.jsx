import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import HomePage from "../pages/HomePage";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
} from "../../constants/clientRoutes";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResponsiveAppBar />}>
            <Route path={HOME_ROUTE} element={<HomePage />} />
            <Route path={LOGIN_ROUTE} element={<LoginForm />} />
            <Route path={SIGNUP_ROUTE} element={<SignupForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
