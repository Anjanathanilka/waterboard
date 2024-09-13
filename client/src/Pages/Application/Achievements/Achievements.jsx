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
import AchievementComp from "../../../components/AchievementComp";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";

import {
  useCreateAppAchvDetailsMutation,
  useGetAppAchvDetailsQuery,
  useDeleteAchvDetailsMutation,
} from "../../../state/api";

const initAchievement = {
  title: "",
  organization: "",
  startDate: {},
  endDate: {},
  description: "",
  attachement: "",
  attachmentPath: "",
};

const Achievements = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [currentStep, setCurrentStep] = useOutletContext();
  const userData = useSelector((state) => state.userContext.data);
  const [file, setFile] = useState(null);
  const [achievement, setAchievement] = useState(initAchievement);
  const [achievementList, setAchievementList] = useState([]);
  const navigate = useNavigate();

  const [createAchvDetails, { isLoading: createLoading }] =
    useCreateAppAchvDetailsMutation();
  const [deleteAchvDetails, { isLoading: deleteLoading }] =
    useDeleteAchvDetailsMutation();

  const {
    data: achievementDetails,
    isLoading: achvDataLoading,
    isSuccess,
  } = useGetAppAchvDetailsQuery({
    userId: userData.data.UserId,
  }) || [];

  useEffect(() => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setAchievementList(achievementDetails?.data || []);
  }, [achievementDetails?.data]);

  const handleChange = (e) => {
    setAchievement({ ...achievement, [e.target.name]: e.target.value });
  };

  const handleAddDetail = () => {
    createAchvDetails({
      ...achievement,
      userId: userData.data.UserId,
      attachment: file,
      attachmentPath: file?.name,
    }).unwrap();
    resetFields();
  };

  const handleEditDetails = (detialId) => {
    const achvDetail = achievementDetails.data.filter(
      (x) => x.achvDetailId === detialId
    );
    setAchievement(() => achvDetail[0]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleDeleteDetail = (detailId) => {
    deleteAchvDetails({ detailId }).unwrap();
    resetFields();
  };

  const resetFields = () => {
    setAchievement(initAchievement);
    setFile(null);
  };

  const handleNext = (e) => {
    navigate("/application/declaration");
  };

  const handleBack = () => {
    navigate("/application/profDetails");
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
              Other Achievements
            </Typography>
          </Grid>
          <Input
            name="title"
            label="Title/ Role *"
            handleChange={handleChange}
            value={achievement?.title || ""}
            required
          />
          <Input
            name="organization"
            label="Organization *"
            value={achievement?.organization || ""}
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
                  value={dayjs(achievement?.startDate) || {}}
                  onChange={(newValue) =>
                    setAchievement({
                      ...achievement,
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
                  value={dayjs(achievement?.endDate) || {}}
                  onChange={(newValue) => {
                    setAchievement({
                      ...achievement,
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
            name="description"
            label="Description"
            value={achievement?.description || ""}
            handleChange={handleChange}
            multiline
          />
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
          achievementList.map((detail, index) => {
            return (
              <AchievementComp
                key={index}
                achievement={detail}
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

export default Achievements;
