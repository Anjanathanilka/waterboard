import { Container, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import ButtonComp from "../../components/ButtonComp";
import Input from "../../components/Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/";
import { getUserDataOnFailiure, getUserDataOnSuccess } from "../../state/Auth";

const initState = { userName: "", password: "" };

const SignIn = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState(initState);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Track if it's admin login
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data;

      // Call the appropriate API based on isAdmin flag
      if (isAdmin) {
        // Admin signin
        data = await api.adminSignin(loginData);
      } else {
        // Regular user signin
        data = await api.signin(loginData);
      }

      const successData = { result: data.result, token: data.token };

      // Save token and user data in localStorage
      localStorage.setItem(
        "profile",
        JSON.stringify({
          token: data.token,
          userData: data.result,
        })
      );

      // Dispatch success action
      dispatch(getUserDataOnSuccess(successData));
      navigate("/home");  // Navigate to the appropriate page (admin or user dashboard)
    } catch (error) {
      // Handle errors (invalid credentials, server error, etc.)
      dispatch(getUserDataOnFailiure(error.response.data));
      setError(error.response.data);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
        elevation={0}
        variant="outlined"
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: "1rem" }}>
            <Input
              name="userName"
              label={isAdmin ? "Employee No *" : "Email *"}
              handleChange={handleChange}
              required
            />
            <Input
              name="password"
              label="Password *"
              handleChange={handleChange}
              required
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Grid item xs={12}>
              <ButtonComp type="submit" fullWidth variant="contained">
                Sign In
              </ButtonComp>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "0.8rem" }}>
                -- or --
              </Typography>
            </Grid>

            {/* Button to toggle between admin/user signin */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <ButtonComp
                fullWidth
                variant="outlined"
                onClick={() => setIsAdmin(!isAdmin)} // Toggle between admin and user login
              >
                {isAdmin ? "Sign in with Email" : "Sign in as Employee"}
              </ButtonComp>
            </Grid>
          </Grid>

          {error && (
            <Typography
              sx={{
                fontSize: "0.8rem",
                m: "1rem",
                p: "1rem",
                color: "#ff0000",
                border: "1px solid red",
                borderRadius: "5px",
              }}
            >
              {error.message}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;