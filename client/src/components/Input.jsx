import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Input = ({
  name,
  label,
  handleChange,
  half,
  quarter,
  type,
  value,
  required,
  disabled,
  handleShowPassword,
  size,
  multiline,
}) => {
  return (
    <Grid
      item
      xs={12}
      sm={half ? 6 : quarter ? 4 : 12}
      sx={{ textAlign: "left" }}
    >
      <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
        {label}
      </Typography>
      <TextField
        name={name}
        onChange={handleChange}
        required={required}
        fullWidth
        disabled={disabled}
        value={value}
        type={type}
        multiline={multiline}
        rows={multiline && 4}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : name === "mobileNo" && {
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography
                      sx={{
                        pr: "10px",
                        borderRight: (theme) =>
                          `1px solid ${theme.palette.secondary.main}`,
                      }}
                    >
                      +94
                    </Typography>
                  </InputAdornment>
                ),
              }
        }
        sx={{
          backgroundColor: (theme) => theme.palette.background.main,
        }}
        size={size ? size : "small"}
      />
    </Grid>
  );
};

export default Input;
