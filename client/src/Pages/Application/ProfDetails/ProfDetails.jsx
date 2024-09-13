import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import FileUploader from "../../../components/FileUploader";
import Input from "../../../components/Input";
import ProfComponent from "../../../components/ProfComponent";
import StepperButton from "../../../components/StepperButton";
import {
  useCreateAppExpDetailsMutation,
  useDeleteExpDetailsMutation,
  useGetAppExpDetailsQuery,
} from "../../../state/api";

const initExpDetail = {
  title: "",
  organization: "",
  startDate: {},
  endDate: {},
  description: "",
  attachement: "",
  attachmentPath: "",
};

const ProfDetails = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [currentStep, setCurrentStep] = useOutletContext();
  const [file, setFile] = useState(null);
  const [expDetail, setExpDetail] = useState(initExpDetail);
  const [expDetailsList, setExpDetailsList] = useState([]);
  const [boardEmpCheck, setBoardEmpCheck] = useState(false);
  const [noOfdays, setNoOfdays] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userContext.data);

  const profDetailsList = useSelector(
    (state) => state.userApplication.experience
  );

  const [createAppExpDetails, { isLoading: createLoading }] =
    useCreateAppExpDetailsMutation();

  const [deleteExpDetail, { isLoading: deleteLoading }] =
    useDeleteExpDetailsMutation();

  const {
    data: experienceDetails,
    isLoading: expDataLoading,
    isSuccess,
  } = useGetAppExpDetailsQuery({
    userId: userData.data.UserId,
  }) || [];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setCurrentStep(2);
    setExpDetailsList(experienceDetails?.data || []);
  }, [experienceDetails?.data]);

  const handleChange = (e) => {
    setExpDetail({ ...expDetail, [e.target.name]: e.target.value });
  };

  const hadleEmpCheck = () => {
    setBoardEmpCheck(!boardEmpCheck);
  };

  const handleAddDetail = () => {
    createAppExpDetails({
      ...expDetail,
      userId: userData.data.UserId,
      attachment: file,
      attachmentPath: file?.name,
    }).unwrap();
    resetFields();
  };

  const handleEditDetails = (detialId) => {
    const edDetail = experienceDetails.data.filter(
      (x) => x.expDetailId === detialId
    );
    setExpDetail(() => edDetail[0]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleDeleteDetail = (detailId) => {
    // deleteEduDetails({ detailId }).unwrap();
    deleteExpDetail({ detailId }).unwrap();
    resetFields();
  };

  const resetFields = () => {
    setExpDetail(initExpDetail);
    setFile(null);
  };

  const handleNext = (e) => {
    navigate("/application/achievements");
  };

  const handleBack = () => {
    navigate("/application/eduDetails");
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
              Professional Qualification & Experience
            </Typography>
          </Grid>
          {/* TODO: This should be visible only for board employees */}
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>
                Is Board Experience * / මණ්ඩල සේවයේ විස්තර
              </Typography>
              <Checkbox sx={{ ml: "1rem" }} onChange={hadleEmpCheck} />
            </div>
          </Grid>
          <Input
            name="title"
            label="Title/ Role *"
            value={expDetail?.title || ""}
            handleChange={handleChange}
            required
          />
          <Input
            name="organization"
            label="Organization/ Department *"
            value={expDetail?.organization || ""}
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
                  value={dayjs(expDetail?.startDate) || {}}
                  onChange={(newValue) =>
                    setExpDetail({
                      ...expDetail,
                      startDate: newValue?.$d,
                    })
                  }
                  sx={{
                    width: "100%",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                  slotProps={{ textField: { size: "small" } }}
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
                  value={dayjs(expDetail?.endDate) || {}}
                  onChange={(newValue) => {
                    setExpDetail({
                      ...expDetail,
                      endDate: newValue?.$d,
                    });
                    setNoOfdays(
                      dayjs(newValue?.$d).diff(expDetail?.startDate, "days")
                    );
                  }}
                  sx={{
                    width: "100%",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                  slotProps={{ textField: { size: "small" } }}
                />
              </Grid>

              <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                <Input
                  name="days"
                  label="No of Days"
                  disabled
                  value={noOfdays || ""}
                />
              </Grid>
            </Grid>
          </Grid>
          <Input
            name="description"
            label="Description"
            value={expDetail?.description || ""}
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
          expDetailsList.map((detail, index) => {
            return (
              <ProfComponent
                key={index}
                profDetail={detail}
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

export default ProfDetails;
