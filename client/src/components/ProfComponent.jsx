import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CardActions,
  CardContent,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import React from "react";
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

const ProfComponent = ({ profDetail, isActive, handleEdit, handleDelete }) => {
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
      {/* <IconButton sx={{ borderRadius: 0, width: "100%", p: 0, m: 0 }}> */}
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
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Typography variant="h4">{profDetail.title}</Typography>
              {/* TODO: Set the lable based on the board experience checks */}
              <Typography
                variant="h5"
                color={theme.palette.primary[500]}
                sx={{ fontWeight: 500, fontStyle: "italic" }}
              >
                [Board Experience]
              </Typography>
            </div>
            <Typography variant="h5" color={theme.palette.secondary[600]}>
              {profDetail.organization}
            </Typography>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconButton onClick={() => handleEdit(profDetail.expDetailId)}>
              <EditNoteIcon sx={{ width: 28, height: 28 }} />
            </IconButton>
            <IconButton onClick={() => handleDelete(profDetail.expDetailId)}>
              <DeleteIcon sx={{ width: 28, height: 28 }} />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4rem" }}>
            <Typography variant="common">
              {`${new Date(profDetail.startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })} - ${new Date(profDetail.endDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}`}
            </Typography>
            {(profDetail.attachmentPath ||
              profDetail.attachmentPath === "/") && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Typography variant="common">attachment</Typography>
                <DownloadIcon fileName={profDetail.attachmentPath} />
              </div>
            )}
          </div>
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
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="common">{profDetail.description}</Typography>
          </CardContent>
        </Collapse>
      </CardContent>
      {/* </IconButton> */}
    </Paper>
  );
};

export default ProfComponent;
