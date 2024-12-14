import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SIGNUP_URL } from "../../constants/endpoints";
import axiosFetch from "../api/axiosFetch";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoadingOverlay from "./LoadingOverlay";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "user",
    },
    mode: "onChange",
  });

  const nav = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    console.log(formData);
    await fetchData(formData);
  };

  useEffect(() => {
    if (data) nav("/login");
    else if (error) console.log(error);
    else if (loading) console.log("Loading...");
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
          Create your account!
        </Typography>
        <Typography variant="h5" component="h1">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submit)}
          sx={{ mt: 3, width: "58%" }}
        >
          <TextField
            {...register("firstName", { required: "First name is required" })}
            error={errors.firstName ? true : false}
            helperText={errors.firstName?.message}
            margin="normal"
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            {...register("lastName", { required: "Last name is required" })}
            error={errors.lastName ? true : false}
            helperText={errors.lastName?.message}
            id="lastName"
            label="Last Name"
            margin="normal"
            fullWidth
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
            id="email"
            label="Email"
            margin="normal"
            fullWidth
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            {...register("password", { required: "Password is required" })}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            id="password"
            label="Password"
            margin="normal"
            fullWidth
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Button
              sx={{ ":hover": { textDecoration: "underline" } }}
              onClick={() => {
                nav("/login");
              }}
            >
              Register
            </Button>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SignupForm;
