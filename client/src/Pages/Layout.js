import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../Assets/WB_Logo.png";
import CareerBanner from "../components/CareerBanner";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";
import { logOut } from "../state/Auth";

const Layout = () => {
  const [isNavbar, setIsNavBar] = useState(false);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userContext.data);

  // useEffect(() => {
  //   const token = user?.token;
  //   console.log("🚀 ~ file: Navbar.jsx:30 ~ useEffect ~ user:", user);
  //   if (token) {
  //     const decodedToken = decode(token);
  //     if (decodedToken * 1000 < new Date().getTime()) handleLogOut();
  //   } else {
  //     handleLogOut();
  //   }
  // }, []);

  // const handleLogOut = () => {
  //   localStorage.clear();
  //   navigate("/");
  //   dispatch(logOut);
  // };

  return (
    <Box>
      <Box sx={{ position: "static" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="img"
            alt="Company logo"
            src={logo}
            height={isNonMobile ? "60px" : "50px"}
            width={isNonMobile ? "400px" : "300px"}
            sx={{
              objectFit: "contain",
              m: "10px 0",
            }}
          ></Box>
        </Box>
        {isNavbar ? (
          <Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isMobile={!isNonMobile}
          />
        ) : (
          <CareerBanner />
        )}
      </Box>
      <Box>
        <Outlet context={[isNavbar, setIsNavBar]} />
      </Box>
    </Box>
  );
};

export default Layout;
