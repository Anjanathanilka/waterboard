import React from "react";
import ButtonComp from "./ButtonComp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StepButton = ({ handleClick, next, back }) => {
  return (
    <div>
      <ButtonComp
        sx={{ mt: "1rem", p: "8px 12px" }}
        onClick={handleClick}
        endIcon={next && <ArrowForwardIcon />}
        startIcon={back && <ArrowBackIcon />}
      >
        {next ? "Save & Next" : "Back"}
      </ButtonComp>
    </div>
  );
};

export default StepButton;
