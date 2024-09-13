import {
  Paper,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
  Button,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Input from "../../../components/Input";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FileUploader from "../../../components/FileUploader";
import StepperButton from "../../../components/StepperButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EducationDetail from "../../../components/EduComponent";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useCreateAppEduDetailsMutation,
  useGetAppEduDetailsQuery,
  useDeleteEduDetailsMutation,
} from "../../../state/api";

const initEduDetail = {
  educationType: "",
  instituteName: "",
  qualification: "",
  fieldOfStudy: "",
  startDate: {},
  endDate: {},
  grade: "",
  attachement: "",
  attachmentPath: "",
};

const eduTypes = [
  { id: 1, description: "Doctoral Degree" },
  { id: 2, description: "Master" },
  { id: 3, description: "Postgraduate Certificate" },
  { id: 4, description: "Postgraduate Diploma" },
  { id: 5, description: "Bachelors" },
  { id: 6, description: "Diploma" },
  { id: 7, description: "Certificate" },
  { id: 8, description: "Advanced Level" },
  { id: 9, description: "Ordinary Level" },
];

const EduDetails = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [currentStep, setCurrentStep] = useOutletContext();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userContext.data);

  const [createAppEduDetails, { isLoading: createLoading }] =
    useCreateAppEduDetailsMutation();
  const [deleteEduDetails, { isLoading: deleteLoading }] =
    useDeleteEduDetailsMutation();

  const {
    data: educationDetails,
    isLoading: eduDataLoading,
    isSuccess,
  } = useGetAppEduDetailsQuery({
    userId: userData.data.UserId,
  }) || [];

  const [eduDetail, setEduDetail] = useState({});
  const [eduDetailList, setEduDetailList] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setCurrentStep(1);
    setEduDetailList(educationDetails?.data || []);
  }, [educationDetails?.data]);

  const handleChange = (e) => {
    setEduDetail({ ...eduDetail, [e.target.name]: e.target.value });
  };

  const handleAddDetail = () => {
    createAppEduDetails({
      ...eduDetail,
      userId: userData.data.UserId,
      attachment: file,
      attachmentPath: file?.name,
    }).unwrap();
    resetFields();
  };

  const handleEditDetails = (detialId) => {
    const edDetail = educationDetails.data.filter(
      (x) => x.eduDetailsId === detialId
    );
    setEduDetail(() => edDetail[0]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleDeleteDetail = (detailId) => {
    deleteEduDetails({ detailId }).unwrap();
    resetFields();
  };

  const resetFields = () => {
    setEduDetail(initEduDetail);
    setFile(null);
  };

  const handleNext = (e) => {
    navigate("/application/profDetails");
  };

  const handleBack = () => {
    navigate("/application/basicDetails");
  };

  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Grid container spacing={2} sx={{ p: "1.5rem" }}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "600" }}>
              Education Qualification
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
              Type of Education *
            </Typography>
            <FormControl size="small">
              <Select
                name="eduTypeId"
                onChange={handleChange}
                value={eduDetail?.eduTypeId || ""}
                sx={{
                  minWidth: "140px",
                  minHeight: "1.4rem",
                  backgroundColor: (theme) => theme.palette.background.main,
                }}
              >
                {eduTypes.map((eduType, index) => (
                  <MenuItem
                    // name="educationType"
                    value={eduType.id}
                    key={eduType.id}
                    // onChange={handleChange}
                  >
                    {eduType.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Input
            name="instituteName"
            label="University/ Institute/ School *"
            value={eduDetail?.instituteName || ""}
            handleChange={handleChange}
            required
          />
          <Input
            name="qualification"
            label="Name of Qualification *"
            value={eduDetail?.qualification || ""}
            handleChange={handleChange}
            required
          />
          <Input
            name="fieldOfStudy"
            label="Field of Study *"
            value={eduDetail?.fieldOfStudy || ""}
            handleChange={handleChange}
            required
          />
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <Grid container spacing={isMobile ? 2 : 5} sx={{ p: "0" }}>
              <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                >
                  Start Date *
                </Typography>
                <DatePicker
                  name="startDate"
                  value={dayjs(eduDetail?.startDate) || {}}
                  onChange={(newValue) =>
                    setEduDetail({
                      ...eduDetail,
                      startDate: newValue?.$d,
                    })
                  }
                  sx={{
                    width: "100%",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                  slotProps={{ textField: { size: "small" } }}
                  views={["month", "year"]}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                >
                  End Date *
                </Typography>
                <DatePicker
                  name="endDate"
                  value={dayjs(eduDetail?.endDate) || {}}
                  onChange={(newValue) => {
                    setEduDetail({
                      ...eduDetail,
                      endDate: newValue?.$d,
                    });
                  }}
                  sx={{
                    width: "100%",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                  slotProps={{ textField: { size: "small" } }}
                  views={["month", "year"]}
                />
              </Grid>
            </Grid>
          </Grid>
          <Input
            name="grade"
            label="Grade *"
            value={eduDetail?.grade || ""}
            handleChange={handleChange}
            required
            quarter
          />
          <Grid
            item
            sm={8}
            sx={{ display: isMobile && "none", textAlign: "left" }}
          ></Grid>
          <Grid item sm={4} sx={{ textAlign: "left" }}>
            <FileUploader
              label="Upload your Certificate"
              isMobile={isMobile}
              setFile={setFile}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <Button onClick={() => handleAddDetail()}>
              <AddCircleIcon sx={{ width: "3rem", height: "3rem" }} />
            </Button>
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
          <StepperButton handleClick={handleNext} next />
        </div>
        // </Grid>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", mt: "2rem" }}>
        {isSuccess ? (
          eduDetailList?.map((detail, index) => {
            return (
              <EducationDetail
                key={detail.eduDetailsId}
                eduDetail={detail}
                isMobile={isMobile}
                handleEdit={handleEditDetails}
                handleDelete={handleDeleteDetail}
              />
            );
          })
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size="5rem" />
          </div>
        )}
      </Box>
    </div>
  );
};

export default EduDetails;
