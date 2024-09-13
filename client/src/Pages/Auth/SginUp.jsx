import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Input from "../../components/Input";
import { useTheme } from "@mui/material/styles";
import ButtonComp from "../../components/ButtonComp";
// import { GoogleLogin } from "react-google-login";
import GoogleIcon from "../../components/GoogleIcon";
import { useNavigate } from "react-router-dom";

import * as api from "../../api/";

const initState = {
  userName: "",
  email: "",
  nic: "",
  EmpNo: "",
  IsBoardEmployee: false,
  mobileNo: "",
  password: "",
  confirmPassword: "",
  empNumber: "",
};

const SignUp = () => {
  const theme = useTheme();
  const [boardEmpCheck, setBoardEmpCheck] = useState(false);
  const [userData, setUserData] = useState(initState);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await api.signup(userData);
      const successData = { result: data.result, token: data.token };
      //  dispatch(getUserDataOnSuccess(successData));
      navigate("/signin");
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const hadleEmpCheck = () => {
    setBoardEmpCheck(!boardEmpCheck);
  };

  const navigate = useNavigate();

  const googleSuccess = () => {};
  const googleError = () => {};

  const switchMode = () => {
    navigate("/signIn");
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
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: "1rem" }}>
            <Input
              name="userName"
              label="Name *"
              handleChange={handleChange}
              required
            />
            <Input
              name="email"
              label="Email Address *"
              handleChange={handleChange}
              required
              type="email"
            />
            <Input
              name="nic"
              label="National Identity No *"
              handleChange={handleChange}
              required
            />
            <Input
              name="mobileNo"
              label="Mobile No *"
              handleChange={handleChange}
              required
            />
            <Input
              name="password"
              label="Password *"
              handleChange={handleChange}
              required
              type="password"
            />
            <Input
              name="confirmPassword"
              label="Confirm Password *"
              handleChange={handleChange}
              required
              type="password"
            />
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox sx={{ ml: "-10px" }} onChange={hadleEmpCheck} />
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>
                  I am a Board Employee
                </Typography>
              </div>
            </Grid>
            {boardEmpCheck && (
              <Input
                name="empNumber"
                label="Employee Number *"
                handleChange={handleChange}
                required
              />
            )}
            <Grid item xs={12}>
              <ButtonComp type="submit" fullWidth variant="contained">
                create an account
              </ButtonComp>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ justifyContent: "center", textAlign: "center" }}
            >
              <Typography sx={{ fontSize: "0.8rem" }}>
                -- or sign up with --
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {/* <GoogleLogin
                clientId="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
                render={(renderProps) => (
                  <ButtonComp
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled || boardEmpCheck}
                    startIcon={<GoogleIcon />}
                    variant="contained"
                  >
                    Google Sign In
                  </ButtonComp>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              /> */}
            </Grid>
          </Grid>
          <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item>
              <Typography
                sx={{ fontSize: "0.8rem", mt: "1rem", cursor: "pointer" }}
                onClick={switchMode}
              >
                Sign in with existing account
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
