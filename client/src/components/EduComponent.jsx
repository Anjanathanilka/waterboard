import React from "react";
import {
  Card,
  Typography,
  useTheme,
  CardContent,
  CardHeader,
  Button,
  IconButton,
  Paper,
  Link,
} from "@mui/material";
import TimelineDot from "@mui/lab/TimelineDot";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import DownloadIcon from "../components/DownloadIcon";

const EducationDetail = ({
  eduDetail,
  isActive,
  isMobile,
  handleEdit,
  handleDelete,
}) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        textAlign: "left",
        borderBottom: `4px solid ${theme.palette.secondary[500]}`,
      }}
    >
      {isMobile ? (
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">{eduDetail.qualification}</Typography>
              <Typography variant="h5" color={theme.palette.secondary[600]}>
                {eduDetail.instituteName}
              </Typography>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <TimelineDot />
              <Typography variant="common">
                {eduDetail.educationType}
              </Typography>
            </div>
            <Typography variant="common">
              {`${new Date(eduDetail.startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })} - ${new Date(eduDetail.endDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}`}
            </Typography>
            <Typography variant="common">
              {`Specialized in ${eduDetail.fieldOfStudy}`}
            </Typography>
            <Typography variant="common">
              {`Grade - ${eduDetail.grade}`}
            </Typography>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Typography variant="common">attachment</Typography>
              <DownloadIcon fileName={eduDetail.attachmentPath} />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                justifyContent: "flex-end",
              }}
            >
              <IconButton onClick={() => handleEdit(eduDetail.eduDetailsId)}>
                <EditNoteIcon sx={{ width: 28, height: 28 }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(eduDetail.eduDetailsId)}>
                <DeleteIcon sx={{ width: 28, height: 28 }} />
              </IconButton>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <div
            style={{
              display: "flex",
              marginBottom: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">{eduDetail.qualification}</Typography>
              <Typography variant="h5" color={theme.palette.secondary[600]}>
                {eduDetail.instituteName}
              </Typography>
            </div>

            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <IconButton onClick={() => handleEdit(eduDetail.eduDetailsId)}>
                <EditNoteIcon sx={{ width: 28, height: 28 }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(eduDetail.eduDetailsId)}>
                <DeleteIcon sx={{ width: 28, height: 28 }} />
              </IconButton>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <TimelineDot />
              <Typography variant="common">
                {eduDetail.educationType}
              </Typography>
            </div>
            <Typography variant="common">
              {`${new Date(eduDetail.startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })} - ${new Date(eduDetail.endDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}`}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4rem",
              marginLeft: "1.7rem",
            }}
          >
            <Typography variant="common">
              {`Specialized in ${eduDetail.fieldOfStudy}`}
            </Typography>
            <Typography variant="common">
              {`Grade - ${eduDetail.grade}`}
            </Typography>
            {(eduDetail.attachmentPath || eduDetail.attachmentPath === "/") && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Typography variant="common">attachment</Typography>
                <DownloadIcon fileName={eduDetail.attachmentPath} />
              </div>
            )}
          </div>
        </CardContent>
      )}
      {/* </IconButton> */}
    </Paper>
  );
};

export default EducationDetail;
