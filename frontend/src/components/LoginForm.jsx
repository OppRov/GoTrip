import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import axiosFetch from "../api/axiosFetch";
import { LOGIN_URL } from "../../constants/endpoints";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, loading, error, fetchData } = axiosFetch({
    url: LOGIN_URL,
    method: "POST",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    await fetchData({ email, password });
    console.log(data, loading, error);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
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
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;
