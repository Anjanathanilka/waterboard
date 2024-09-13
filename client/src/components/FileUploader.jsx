import React, { useState, useRef } from "react";
import {
  Grid,
  TextField,
  useTheme,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";

const FileUploader = ({ label, isMobile, setFile }) => {
  const inputFile = useRef(null);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const handleFileChange = (e) => {
    if (e.target.files) {
      if (e.target.files[0].type.indexOf("pdf") > 0) {
        if (e.target.files[0].size < 5 * 1000 * 1024) {
          setFile(e.target.files[0]);
          setError(null);
        } else {
          setError("File size must be less than 5MB");
        }
      } else {
        setError("Incorrect File Format!");
      }
    } else {
      setError("File is not available to upload");
    }
  };

  return (
    <div>
      <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
        {label}
      </Typography>
      <TextField
        sx={{
          // p: "4px",
          backgroundColor: theme.palette.background.main,
          // border: `1px solid ${theme.palette.secondary[600]}`,
          // width: "300px",
          "& .MuiInputBase-root": {
            paddingRight: 0,
          },
          "& .MuiButtonBase-root": {
            background: theme.palette.primary[500],
            borderRadius: "0 4px 4px 0",
            // borderTopRightRadius: "4px",
            // borderBottomRightRadius: "4px"
          },
        }}
        type="file"
        accept=".pdf"
        size="small"
        ref={inputFile}
        InputProps={
          !isMobile && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    inputFile.current.click();
                  }}
                >
                  <AttachmentIcon sx={{ color: "white", width: "48px" }} />
                </IconButton>
              </InputAdornment>
            ),
          }
        }
        onChange={handleFileChange}
      ></TextField>
      {error && (
        <Typography sx={{ fontSize: "0.8rem", color: "#ff0000", mt: "5px" }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default FileUploader;
