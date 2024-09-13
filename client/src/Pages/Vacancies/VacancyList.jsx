import {
  Paper,
  Container,
  Typography,
  InputBase,
  IconButton,
  useMediaQuery,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Vacancy from "../../components/Vacancy";
import Input from "../../components/Input";
import FilterDialog from "../../components/FilterDialog";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useGetVacancyBySearchQuery,
  useGetMasterDataQuery,
} from "../../state/api";
import TuneIcon from "@mui/icons-material/Tune";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const searchInit = {
  searchQuery: "",
  vacancyType: "",
  salaryGroup: "",
  boardGrade: "",
};

const VacancyList = () => {
  const [isNavbar, setIsNavBar] = useOutletContext();
  // const query = useQuery();
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [search, setSearch] = useState(searchInit);
  // const page = query.get("page") || 1;
  // const searchQuery = query.get("searchQuery");
  const [open, setOpen] = React.useState(false);

  const { data: searchVacancyList, isLoading: vacancySearchLoading } =
    useGetVacancyBySearchQuery(search) || {};
  const { data: masterData, isLoading: masterDataLoading } =
    useGetMasterDataQuery() || {};

  useEffect(() => {
    setIsNavBar(true);
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchVacancy();
    }
  };

  const searchVacancy = async () => {
    if (search.trim()) {
    } else {
      navigate("/");
    }
  };

  const handleClickFilterOpen = () => {
    setOpen(true);
  };

  const handleCloseFilter = () => {
    setOpen(false);
    // setSearch(searchInit);
  };

  const handleReset = () => {
    setSearch(searchInit);
  };

  return (
    <div style={{ backgroundColor: theme.palette.background.main }}>
      <Container component="main" maxWidth="md">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              m: "1rem 0",
            }}
          >
            Job Search
          </Typography>
          <div style={{ display: "flex", width: "75%", alignItems: "center" }}>
            <TextField
              variant="outlined"
              name="search"
              type="text"
              value={search?.searchQuery || ""}
              placeholder="Search..."
              onKeyDown={handleKeyPress}
              onChange={(e) =>
                setSearch({ ...search, searchQuery: e.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={searchVacancy}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                border: (theme) => `1px solid ${theme.palette.primary[500]}`,
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            />
            <IconButton
              aria-label="Filter"
              onClick={handleClickFilterOpen}
              handleClose={handleCloseFilter}
            >
              <TuneIcon
                fontSize="large"
                sx={{
                  backgroundColor: "white",
                  width: "3rem",
                  height: "3rem",
                }}
              />
            </IconButton>
          </div>
          <FilterDialog
            open={open}
            masterData={masterData}
            handleClose={handleCloseFilter}
            setSearch={setSearch}
            search={search}
            handleReset={handleReset}
          />
          {/* </Paper> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {searchVacancyList && !vacancySearchLoading ? (
            searchVacancyList.data.map((vacancy) => {
              return <Vacancy key={vacancy.VacancyId} detail={vacancy} />;
            })
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress size="5rem" />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default VacancyList;
