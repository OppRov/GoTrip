import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import axiosFetch from "../api/axiosFetch";
import { LOGIN_URL } from "../../constants/endpoints";
import { useForm } from "react-hook-form";
import LoadingOverlay from "./LoadingOverlay";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { data, loading, error, fetchData } = axiosFetch({
    url: LOGIN_URL,
    method: "POST",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const nav = useNavigate();

  const submit = async () => {
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    await fetchData(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    console.log("Data:", data, "Loading:", loading, "Error:", error);
    if (!loading && !error && data) {
      localStorage.setItem("token", data.data.token);
      nav("/");
    }
  }, [data, loading, error]);

  return (
    <>
      <LoadingOverlay open={loading} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 2, fontSize: "2rem", weight: "bold" }}
        >
          Welcome Back!
        </Typography>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submit)} sx={{ mt: 3 }}>
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Button
              sx={{ ":hover": { textDecoration: "underline" } }}
              onClick={() => {
                nav("/register");
              }}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default LoginForm;
