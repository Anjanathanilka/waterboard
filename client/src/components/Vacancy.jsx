import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ButtonComp from "./ButtonComp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setVacancyDetails } from "../state/UserApplication";
import dayjs from "dayjs";

const Vacancy = ({ detail }) => {
  const subTitle = `Posted ${detail.DaysPosted} `;
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    const applyingVacancy = {
      vacancyId: detail.VacancyId,
      vacancy: detail.VacancyName,
    };
    navigate("/application/basicDetails", {
      state: applyingVacancy,
    });
    dispatch(setVacancyDetails(applyingVacancy));
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={detail.VacancyName}
        subheader={subTitle}
        sx={{
          backgroundColor: "#f9f9f9",
          p: "0.5rem 1rem",
        }}
        titleTypographyProps={{
          fontSize: (isMobile) => (isMobile ? "1.2rem" : "3rem"),
          fontWeight: 700,
        }}
        subheaderTypographyProps={{
          fontSize: (isMobile) => (isMobile ? "0.8rem" : "1rem"),
        }}
      />
      <CardContent>
        <Typography
          fontSize={isMobile ? "14px" : "16px"}
          sx={{
            fontWeight: 550,
            mb: "10px",
            color: theme.palette.secondary[900],
          }}
        >
          {detail.RecruitmentType}
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={isMobile ? 12 : 4}>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                Closing date:{" "}
              </Typography>
              <Typography
                fontSize={isMobile ? "14px" : "16px"}
                sx={{ fontWeight: 550, color: theme.palette.secondary[700] }}
              >
                {dayjs(detail?.ClosingDate).format("YYYY-MM-DD")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={isMobile ? 12 : 8}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                Published date:{" "}
              </Typography>
              <Typography
                fontSize={isMobile ? "14px" : "16px"}
                sx={{ fontWeight: 550, color: theme.palette.secondary[700] }}
              >
                {dayjs(detail?.PublishedDate).format("YYYY-MM-DD")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={isMobile ? 12 : 4}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                Salary Group:{" "}
              </Typography>
              <Typography
                fontSize={isMobile ? "14px" : "16px"}
                sx={{ fontWeight: 550, color: theme.palette.secondary[700] }}
              >
                {detail.SalaryGroup}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={isMobile ? 12 : 4}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                Board Grade:{" "}
              </Typography>
              <Typography
                fontSize={isMobile ? "14px" : "16px"}
                sx={{ fontWeight: 550, color: theme.palette.secondary[700] }}
              >
                {detail.BoardGrade}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={isMobile ? 12 : 4}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                Advertisement:{" "}
              </Typography>
              <DescriptionOutlinedIcon
                sx={{ color: theme.palette.primary[500] }}
              />
            </div>
          </Grid>
        </Grid>
        <hr
          style={{
            border: "none",
            height: "2px",
            backgroundColor: theme.palette.secondary[300],
          }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <VisibilityIcon sx={{ fontSize: "24px" }} />
            <Typography fontSize={isMobile ? "14px" : "16px"}>
              Applied ({detail.NoOfApplicants})
            </Typography>
          </div>
          <ButtonComp
            sx={{ marginLeft: "auto" }}
            onClick={(e) => handleApply(e)}
          >
            Apply
          </ButtonComp>
        </div>
      </CardContent>
    </Card>
  );
};

export default Vacancy;
