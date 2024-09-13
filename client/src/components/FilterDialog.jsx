import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Input from "./Input";

const FilterDialog = ({
  open,
  handleClose,
  masterData,
  setSearch,
  search,
  handleReset,
}) => {
  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  return (
    <Dialog maxWidth="xs" open={open} onClose={handleClose} fullWidth="true">
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <DialogActions>
          <Button onClick={handleReset}>Reset</Button>
        </DialogActions>
        <DialogTitle>Filter Search</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </div>
      <DialogContent sx={{ pt: 0 }}>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "100%",
          }}
        >
          <Grid container spacing={2} sx={{ p: "1.5rem" }}>
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Type
              </Typography>
              <FormControl size="small" sx={{ width: "100%" }}>
                <Select
                  name="vacancyType"
                  onChange={handleChange}
                  value={search?.vacancyType || ""}
                  sx={{
                    minHeight: "1.4rem",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                >
                  <MenuItem value={"EXT"}>External</MenuItem>
                  <MenuItem value={"INT"}>Internal</MenuItem>
                  <MenuItem value={"EXTINT"}>External & Internal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Salary Group
              </Typography>
              <FormControl size="small" sx={{ width: "100%" }}>
                <Select
                  name="salaryGroup"
                  onChange={handleChange}
                  value={search?.salaryGroup || ""}
                  sx={{
                    minHeight: "1.4rem",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                >
                  {masterData?.data.salaryGroups?.map((detail, index) => {
                    return (
                      <MenuItem value={detail.value}>{detail.text}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Board Grade
              </Typography>
              <FormControl size="small" sx={{ width: "100%" }}>
                <Select
                  name="boardGrade"
                  onChange={handleChange}
                  value={search?.boardGrade || ""}
                  sx={{
                    minHeight: "1.4rem",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                >
                  {masterData &&
                    masterData?.data.boardGrades?.map((detail, index) => {
                      return (
                        <MenuItem value={detail.value}>{detail.text}</MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{ width: "100%" }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
