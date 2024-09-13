import React from "react";
import {
  Box,
  useTheme,
  Typography,
  Paper,
  Stepper,
  Step,
  StepButton,
  Button,
  MobileStepper,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const steps = [
  "Basic Details",
  "Educational Qualification",
  "Professinoal Experience",
  "Other Achievements",
  "Declaration",
];

const StepGuide = ({ isMobile, activeStep = 0, setActiveStep }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (index) => {
    // switch (index) {
    //   case 0:
    //     navigate("/application/basicDetails");
    //     break;
    //   case 1:
    //     navigate("/application/eduDetails");
    //     break;
    //   default:
    //     break;
    // }
  };
  return (
    <Paper
      sx={{
        display: "flex",
        minWidth: "200px",
        maxHeight: "600px",
        justifyContent: "center",
      }}
    >
      {" "}
      {isMobile ? (
        <MobileStepper
          variant="dots"
          steps={6}
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 400, flexGrow: 1 }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === 5}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      ) : (
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            pt: "1rem",
            pb: "1rem",
            "& .MuiStepper-root": {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
            "& .MuiStepConnector-root": {
              display: "block",
              margin: "auto",
            },
            "& .MuiStepConnector-line": {
              height: "100%",
            },
            "& .MuiStep-root": {
              margin: "auto",
            },
          }}
        >
          {steps.map((label, index) => (
            <Step
              key={label}
              sx={{
                "& .MuiStepLabel-root": {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "0.5rem",
                },
                "& .MuiStepLabel-iconContainer": {
                  padding: "0",
                },
              }}
            >
              <StepButton color="inherit" onClick={handleStep(index)}>
                <Typography
                  color={index === activeStep && theme.palette.primary[500]}
                  sx={{ fontWeight: index === activeStep && "600" }}
                >
                  {label}
                </Typography>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      )}
    </Paper>
  );
};

export default StepGuide;
