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
  CardActions,
} from "@mui/material";
import TimelineDot from "@mui/lab/TimelineDot";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "../components/DownloadIcon";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const AchievementComp = ({
  achievement,
  isActive,
  isMobile,
  handleEdit,
  handleDelete,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper
      sx={{
        textAlign: "left",
        borderBottom: `4px solid ${theme.palette.secondary[500]}`,
      }}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            marginBottom: "1rem",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
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
            <Typography variant="h4">{achievement.title}</Typography>
            <Typography variant="h5" color={theme.palette.secondary[600]}>
              {achievement.organization}
            </Typography>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconButton onClick={() => handleEdit(achievement.achvDetailId)}>
              <EditNoteIcon sx={{ width: 28, height: 28 }} />
            </IconButton>
            <IconButton onClick={() => handleDelete(achievement.achvDetailId)}>
              <DeleteIcon sx={{ width: 28, height: 28 }} />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "0.5rem" : "4rem",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Typography variant="common">
              {`${new Date(achievement.startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })} - ${new Date(achievement.endDate).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  year: "numeric",
                }
              )}`}
            </Typography>

            {achievement?.attachmentPath !== "undefined" && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Typography variant="common">attachment</Typography>
                <DownloadIcon fileName={achievement.attachmentPath} />
              </div>
            )}
          </div>
          {achievement.description && (
            <CardActions>
              <Typography variant="common" color={theme.palette.primary[500]}>
                see more...
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
          )}
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="common">{achievement.description}</Typography>
          </CardContent>
        </Collapse>
      </CardContent>
    </Paper>
  );
};

export default AchievementComp;
