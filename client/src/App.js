import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Layout from "./Pages/Layout";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SginUp";
import ApplicationLayout from "./Pages/Application/ApplicationLayout";
import VacancyList from "./Pages/Vacancies/VacancyList";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import BasicDetails from "./Pages/Application/BasicDetails/BasicDetails";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EduDetails from "./Pages/Application/EduDetails/EduDetails";
import ProfDetails from "./Pages/Application/ProfDetails/ProfDetails";
import Achievements from "./Pages/Application/Achievements/Achievements";
import Declaration from "./Pages/Application/Declaration/Declaration";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.userContext.data);
  // const navigate = useNavigate();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Layout />}>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={<Navigate to="/signIn" replace />} />
        </Route>
        <Route element={user ? <Layout /> : <Navigate to="/signIn" replace />}>
          <Route path="/home" element={<VacancyList />} />
          <Route path="/application" element={<ApplicationLayout />}>
            <Route
              path="/application/basicDetails"
              element={<BasicDetails />}
            />
            <Route path="/application/eduDetails" element={<EduDetails />} />
            <Route path="/application/profDetails" element={<ProfDetails />} />
            <Route
              path="/application/achievements"
              element={<Achievements />}
            />
            <Route path="/application/declaration" element={<Declaration />} />
          </Route>
        </Route>
      </Route>
    )
  );
  return (
    <div>
      {/* <BrowserRouter> */}
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
          <CssBaseline />
          {/* <Routes>
          </Routes> */}
        </LocalizationProvider>
      </ThemeProvider>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
