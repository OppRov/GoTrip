import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SIGNUP_URL } from "../../constants/endpoints";
import axiosFetch from "../api/axiosFetch";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });
  const { data, loading, error, fetchData } = axiosFetch({
    url: SIGNUP_URL,
    method: "POST",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to a server
    console.log(formData);
    fetchData(formData);
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
      <Typography variant="h4" component="h2" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          margin="normal"
          fullWidth
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          margin="normal"
          fullWidth
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
        <Typography variant="body2" align="center" mt={2}>
          Already have an account? <Link href="/login">Log In</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default SignupForm;
