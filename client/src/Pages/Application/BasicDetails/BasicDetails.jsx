import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Select,
  Typography,
  useTheme,
  MenuItem,
  Grid,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import Input from "../../../components/Input";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ButtonComp from "../../../components/ButtonComp";
import { useNavigate, useOutletContext } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StepperButton from "../../../components/StepperButton";
import CircularProgress from "@mui/material/CircularProgress";
import * as api from "../../../api";
import { useSelector } from "react-redux";
import {
  useCreateAppBasicDetailsMutation,
  useGetAppBasicDetailsQuery,
} from "../../../state/api";

const initState = {
  title: "",
  nameWithInitials: "",
  nameDenotedbyInit: "",
  otherName: "",
  nic: "",
  dateOfBirth: "",
  sex: "",
  civilStatus: "",
  religion: "",
  addressLine1: "",
  addressLine2: "",
  nationality: "",
  ethnicity: "",
  mobileNo1: "",
  mobileNo2: "",
  email: "",
};
const BasicDetails = ({}) => {
  const [currentStep, setCurrentStep] = useOutletContext();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userContext.data);
  const applyingVacancy = useSelector((state) => state.userApplication.vacancy);
  const [createAppBasicDetails, { isLoadging: createLoading }] =
    useCreateAppBasicDetailsMutation();
  const {
    data: appBasicDetails,
    isLoadging: detailsLoading,
    isSuccess,
  } = useGetAppBasicDetailsQuery({
    userId: userData.data.UserId,
  }) || {};
  const [basicDetails, setBasicDetails] = useState();

  useEffect(() => {
    setCurrentStep(0);
    setBasicDetails(appBasicDetails?.data || {});
  }, [appBasicDetails?.data]);

  const handleNext = async (e) => {
    //   e.preventDefault();
    // basicDetails.vacancyId = applyingVacancy.vacancyId;
    // basicDetails.userId = userData.data.UserId;

    try {
      //  const data = await api.saveBasicDetails(basicDetails);
      await createAppBasicDetails({
        ...basicDetails,
        vacancyId: applyingVacancy.vacancyId,
        userId: userData.data.UserId,
      }).unwrap();

      navigate("/application/eduDetails");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setBasicDetails({ ...basicDetails, [e.target.name]: e.target.value });
  };
  return (
    <Paper
      sx={{
        display: "flex",
      }}
    >
      {isSuccess ? (
        <form style={{ margin: "1px auto" }}>
          <Grid container spacing={2} sx={{ p: "1.5rem" }}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "600", color: theme.palette.primary[500] }}
              >
                Basic Details
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Title *
              </Typography>
              <FormControl size="small">
                <Select
                  name="title"
                  onChange={handleChange}
                  value={basicDetails?.title || ""}
                  sx={{
                    minWidth: "140px",
                    minHeight: "1.4rem",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                >
                  <MenuItem value={"Mr"}>Mr.</MenuItem>
                  <MenuItem value={"Mrs"}>Mrs.</MenuItem>
                  <MenuItem value={"Miss"}>Miss.</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Input
              name="nameWithInitials"
              value={basicDetails?.nameWithInitials || ""}
              label="Name with initials *"
              handleChange={handleChange}
              required
            />
            <Input
              name="nameDenotedbyInit"
              value={basicDetails?.nameDenotedbyInit || ""}
              label="Name denoted by initials"
              handleChange={handleChange}
            />
            <Input
              name="otherName"
              value={basicDetails?.otherName || ""}
              label="Other Names"
              handleChange={handleChange}
            />
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Grid container spacing={isMobile ? 2 : 5} sx={{ p: "0" }}>
                <Input
                  name="nic"
                  value={basicDetails?.nic || ""}
                  label="National identity Card (NIC) *"
                  handleChange={handleChange}
                  required
                  half
                />

                <Grid item xs={12} sm={6}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Date of Birth *
                  </Typography>
                  <DatePicker
                    name="dateOfBirth"
                    // defaultValue={basicDetails.dateOfBirth || ""}
                    onChange={(value) =>
                      setBasicDetails({
                        ...basicDetails,
                        dateOfBirth: value.$d,
                      })
                    }
                    sx={{
                      width: "100%",
                      backgroundColor: (theme) => theme.palette.background.main,
                    }}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Grid container spacing={isMobile ? 2 : 5} sx={{ p: "0" }}>
                <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Sex *
                  </Typography>
                  <FormControl size="small" sx={{ width: "100%" }}>
                    <Select
                      name="sex"
                      onChange={handleChange}
                      value={basicDetails?.sex || ""}
                      sx={{
                        width: "100%",
                        minHeight: "1.4rem",
                        backgroundColor: (theme) =>
                          theme.palette.background.main,
                      }}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Civil Status *
                  </Typography>
                  <FormControl size="small" sx={{ width: "100%" }}>
                    <Select
                      name="civilStatus"
                      onChange={handleChange}
                      value={basicDetails?.civilStatus || ""}
                      sx={{
                        minHeight: "1.4rem",
                        backgroundColor: (theme) =>
                          theme.palette.background.main,
                      }}
                    >
                      <MenuItem value={"Single"}>Single</MenuItem>
                      <MenuItem value={"Married"}>Married</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Input
              name="addressLine1"
              label="Permenant Address line 1 *"
              value={basicDetails?.addressLine1 || ""}
              handleChange={handleChange}
              required
            />
            <Input
              name="addressLine2"
              value={basicDetails?.addressLine2 || ""}
              label="Permenant Address line 2 "
              handleChange={handleChange}
            />
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Grid container spacing={isMobile ? 2 : 5} sx={{ p: "0" }}>
                <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Nationality *
                  </Typography>
                  <FormControl size="small" sx={{ width: "100%" }}>
                    <Select
                      name="nationality"
                      onChange={handleChange}
                      value={basicDetails?.nationality || ""}
                      sx={{
                        width: "100%",
                        minHeight: "1.4rem",
                        backgroundColor: (theme) =>
                          theme.palette.background.main,
                      }}
                    >
                      <MenuItem value={"Sri Lankan"}>Sri Lankan</MenuItem>
                      <MenuItem value={"Indian"}>Indian</MenuItem>
                      <MenuItem value={"Japanese"}>Japanese</MenuItem>
                      <MenuItem value={"Chinease"}>Chinease</MenuItem>
                      <MenuItem value={"Other"}>Other </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Religion *
                  </Typography>
                  <FormControl size="small" sx={{ width: "100%" }}>
                    <Select
                      name="religion"
                      onChange={handleChange}
                      value={basicDetails?.religion || ""}
                      sx={{
                        minHeight: "1.4rem",
                        backgroundColor: (theme) =>
                          theme.palette.background.main,
                      }}
                    >
                      <MenuItem value={"Buddhist"}>Buddhist</MenuItem>
                      <MenuItem value={"Hindu"}>Hindu</MenuItem>
                      <MenuItem value={"Christianity"}>Christianity </MenuItem>
                      <MenuItem value={"Islam"}>Islam </MenuItem>
                      <MenuItem value={"Other"}>Other </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Ethnicity *
                  </Typography>
                  <FormControl size="small" sx={{ width: "100%" }}>
                    <Select
                      name="ethnicity"
                      onChange={handleChange}
                      value={basicDetails?.ethnicity || ""}
                      sx={{
                        minHeight: "1.4rem",
                        backgroundColor: (theme) =>
                          theme.palette.background.main,
                      }}
                    >
                      <MenuItem value={"Sinhala"}>Sinhala</MenuItem>
                      <MenuItem value={"Tamil"}>Tamil</MenuItem>
                      <MenuItem value={"Muslim"}>Muslim </MenuItem>
                      <MenuItem value={"Malay"}>Malay </MenuItem>
                      <MenuItem value={"Burger"}>Burger </MenuItem>
                      <MenuItem value={"Other"}>Other </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Input
              name="mobileNo1"
              label="Mobile No 1 *"
              value={basicDetails?.mobileNo1 || ""}
              handleChange={handleChange}
              required
              half
            />
            <Input
              name="mobileNo2"
              label="Mobile No 2 *"
              value={basicDetails?.mobileNo2 || ""}
              handleChange={handleChange}
              required
              half
            />
            <Input
              name="email"
              label="Email Address *"
              value={basicDetails?.email || ""}
              handleChange={handleChange}
              required
              half
              type="email"
            />
            {!isMobile && (
              <Grid item xs={12} sx={{ textAlign: "right" }}>
                <StepperButton
                  handleClick={(e) => handleNext()}
                  next
                  type="submit"
                />
              </Grid>
            )}
          </Grid>
        </form>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size="5rem" />
        </div>
      )}
    </Paper>
  );
};

export default BasicDetails;
