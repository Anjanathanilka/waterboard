import {
  Paper,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
  Button,
  Checkbox,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import FileUploader from "../../../components/FileUploader";
import StepperButton from "../../../components/StepperButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AchievementComp from "../../../components/AchievementComp";
import { useDispatch, useSelector } from "react-redux";
import { setAchievementsState } from "../../../state/UserApplication";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCreateUplodDocumentsMutation } from "../../../state/api";
import ButtonComp from "../../../components/ButtonComp";

const initAttachments = {
  userId: "",
  vacancyId: "",
  documentPath: "",
  document: null,
};

const Declaration = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [currentStep, setCurrentStep] = useOutletContext();
  const [documentDetails, setDocumentDetails] = useState(initAttachments);
  const [isAgreed, setIsAgreed] = useState(false);
  const [cvDocument, setCvDocument] = useState(null);
  const [nicDocument, setNicDocument] = useState(null);
  const [bcDocument, setBCDocument] = useState(null);
  const userData = useSelector((state) => state.userContext.data);
  const applyingVacancy = useSelector((state) => state.userApplication.vacancy);

  const [uploadDocuments, { isLoading: createLoading }] =
    useCreateUplodDocumentsMutation();

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentStep(4);
  }, []);

  // const handleChange = (e) => {
  //   setDeclationDetails({
  //     ...declationDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const fileUploadHandle = ({ file, type }) => {
    if (!file) {
      return;
    }

    uploadDocuments({
      ...documentDetails,
      userId: userData.data.UserId,
      vacancyId: applyingVacancy.vacancyId,
      docType: type,
      doc: file,
      docPath: file?.name,
    }).unwrap();
  };

  const handleNext = (e) => {};

  const handleBack = () => {
    navigate("/application/achievements");
  };
  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Grid container spacing={2} sx={{ p: "1.5rem" }}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "600" }}>
              Declaration
            </Typography>
          </Grid>
          <Grid item sm={4} sx={{ textAlign: "left" }}>
            <FileUploader
              label="Your CV *"
              isMobile={isMobile}
              setFile={setCvDocument}
            />
          </Grid>
          <Grid
            item
            sm={8}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onClick={() => {
                fileUploadHandle({ file: cvDocument, type: "CV" });
              }}
            >
              Upload
            </Button>
          </Grid>
          <Grid item sm={4} sx={{ textAlign: "left" }}>
            <FileUploader
              label="National Identitiy Card"
              isMobile={isMobile}
              setFile={setNicDocument}
            />
          </Grid>
          <Grid
            item
            sm={8}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onClick={() => {
                fileUploadHandle({ file: nicDocument, type: "NIC" });
              }}
            >
              Upload
            </Button>
          </Grid>
          <Grid item sm={4} sx={{ textAlign: "left" }}>
            <FileUploader
              label="Birth Certificate"
              isMobile={isMobile}
              setFile={setBCDocument}
            />
          </Grid>

          <Grid
            item
            sm={8}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onClick={() => {
                fileUploadHandle({ file: bcDocument, type: "BC" });
              }}
            >
              Upload
            </Button>
          </Grid>

          {/* <Grid item sm={12} sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
              
            </Typography>
            <FileUploader />
          </Grid> */}
          {/* 
          <Grid item sm={12} sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
              National Identitiy Card/ Driving Licence
            </Typography>
            <FileUploader />
          </Grid>

          <Grid item sm={12} sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
              Birth Certificate
            </Typography>
            <FileUploader />
          </Grid> */}

          <Grid item sx={{ textAlign: "left" }}>
            <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
              <Checkbox
                // sx={{ ml: "-10px" }}
                onChange={(e) => setIsAgreed(!isAgreed)}
              />
              <Typography
                sx={{ fontSize: "1rem", fontWeight: 500, mt: "1rem" }}
              >
                I do hereby certify that the particulars furnished by me in this
                application are true and accurate. I am also aware that, any
                particulars contained herein are found to be false or incorrect,
                I am liable to be disqualified before selection or to
                bedismissed without any compensation if such detection is made
                after appointment. *
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      {!isMobile && (
        // <Grid item xs={12} sx={{ textAlign: "right" }}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
          }}
        >
          <StepperButton handleClick={handleBack} back />
          <ButtonComp sx={{ mt: "1rem", p: "8px 12px" }} onClick={handleNext}>
            Submit Application{" "}
          </ButtonComp>
        </div>
        // </Grid>
      )}
    </div>
  );
};

export default Declaration;
