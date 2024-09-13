import React from "react";
import {
  Box,
  useTheme,
  Typography,
  useMediaQuery,
  Container,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import StepGuide from "../../components/StepGuide";
import { useSelector } from "react-redux";

const Application = () => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = React.useState(0);
  const vacancy = useSelector((state) => state.userApplication.vacancy);

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.main,
        pr: "10px",
        pb: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Typography
          fontSize={isMobile ? "14px" : "18px"}
          sx={{
            fontWeight: 700,
            mb: "1rem",
            pt: "1rem",
          }}
        >
          Application for the {vacancy.vacancy}
        </Typography>
      </div>

      <Container maxWidth="lg">
        {/* sx={{ width: isMobile ? "100%" : "85%" }}> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "1rem",
            //  isMobile ? "1rem" : "2rem",
            // margin: isMobile || isTablet ? "1rem 0.5rem" : "1rem 4rem",
          }}
        >
          <Outlet context={[currentStep, setCurrentStep]} />
          <StepGuide
            isMobile={isMobile}
            activeStep={currentStep}
            setActiveStep={setCurrentStep}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Application;
