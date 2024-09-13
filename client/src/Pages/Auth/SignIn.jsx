import { Container, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import ButtonComp from "../../components/ButtonComp";
import Input from "../../components/Input";
// import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as api from "../../api/";
import { useGetMasterDataQuery } from "../../state/api";
import { getUserDataOnFailiure, getUserDataOnSuccess } from "../../state/Auth";

const initState = { userName: "", password: "" };

const SignIn = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState(initState);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isNavbar, setIsNavBar] = useOutletContext();

  const { data: masterData, isLoading: masterDataLoading } =
    useGetMasterDataQuery() || {};

  useEffect(() => {
    setIsNavBar(false);
  }, []);

  const handleShowPassowrd = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await api.signin(loginData);
      const successData = { result: data.result, token: data.token };
      localStorage.setItem(
        "profile",
        JSON.stringify({
          token: data.token,
          userData: data.result,
        })
      );
      dispatch(getUserDataOnSuccess(successData));
      navigate("/home");
    } catch (error) {
      dispatch(getUserDataOnFailiure(error.response.data));
      setError(error.response.data);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const googleSuccess = async (res) => {
    // const result = res?.profileObj;
    const token = res?.credential;
    const successData = { token };
    try {
      localStorage.setItem(
        "profile",
        JSON.stringify({
          token,
        })
      );
      dispatch(getUserDataOnSuccess(successData));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = (err) => {
    console.log("Google Sign In was unsuccessful. Try again later");
    console.log(err);
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
              label="Email Address/ Employee No *"
              handleChange={handleChange}
              required
            />
            <Input
              name="password"
              label="Password *"
              handleChange={handleChange}
              required
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassowrd}
            />
            <Grid item xs={12}>
              <ButtonComp type="submit" fullWidth variant="contained">
                Sign In
              </ButtonComp>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ justifyContent: "center", textAlign: "center" }}
            >
              <Typography sx={{ fontSize: "0.8rem" }}>
                -- or Sign In with --
              </Typography>
            </Grid>
            {/* <Grid item xs={12}>
              <GoogleLogin
                onSuccess={googleSuccess}
                onFailure={googleError}
                // cookiePolicy="single_host_origin"
              />
            </Grid> */}
          </Grid>
          <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item>
              <Typography
                sx={{ fontSize: "0.8rem", mt: "1rem", cursor: "pointer" }}
                onClick={() => {
                  navigate("/signUp");
                }}
              >
                Sign up to create a new account
              </Typography>
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
