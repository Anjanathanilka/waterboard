import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  useTheme,
  List,
  Box,
  IconButton,
  Drawer,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  AccountCircle,
  Assignment,
  ExpandLess,
  ExpandMore,
  Group,
  House,
  Logout,
  PostAdd,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemStyle from "./ListItemStyle";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../state/Auth";
import decode from "jwt-decode";
import { api } from "../state/api";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileAvatar from "./ProfileAvatar";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, isMobile }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const user = useSelector((state) => state.userContext.data);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
    dispatch(api.util.resetApiState());
    dispatch(logOut);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (navigateTo) => {
    !isMobile && setIsSidebarOpen(false);
    navigate(navigateTo);
  };

  return (
    <div style={{ backgroundColor: theme.palette.background.main }}>
      <AppBar
        sx={{
          position: "static",
          boxShadow: "none",
          // display: "flex",
          // justifyContent: "space-between",
          maxHeight: "50px",
          width: "100%",
          backgroundColor: theme.palette.primary[500],
          "& .MuiToolbar-root": {
            minHeight: "0px",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {isMobile ? (
            <Box sx={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  overflowX: "hidden",
                }}
              >
                <IconButton
                  sx={{ ml: "1rem", color: "white" }}
                  onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <ListItemStyle
                  index="4"
                  active={active}
                  sx={{ marginRight: { sm: "initial", xs: "-1rem" } }}
                  subMenu={[
                    {
                      name: "User Profile",
                      icon: <AccountCircle />,
                      onClick: () => {},
                    },
                    {
                      name: "Log Out",
                      icon: <Logout />,
                      onClick: handleLogOut,
                    },
                  ]}
                  children={<ProfileAvatar user={user} />}
                />
              </div>
              <Drawer
                variant="temporary"
                open={isSidebarOpen}
                onClose={() => {
                  setOpen(false);
                  setIsSidebarOpen((i) => !i);
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    backgroundColor: theme.palette.primary[500],
                    width: 180,
                  },
                }}
              >
                <ListItemStyle
                  index="1"
                  icon={<House />}
                  onClick={() => handleClick("/home")}
                  children="Home"
                />

                {/* <ListItemStyle
                  index="2"
                  icon={<Group />}
                  onClick={handleMenuClick}
                >
                  Vacancy
                  {open ? <ExpandLess /> : <ExpandMore />} */}

                <ListItemStyle
                  key="2"
                  active={active}
                  icon={<Assignment />}
                  onClick={() => handleClick("/home")}
                  children="Application"
                />
              </Drawer>
            </Box>
          ) : (
            <Box
              component="nav"
              sx={{
                width: "100%",
              }}
            >
              <List
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: "0",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex" }}>
                  <ListItemStyle
                    key="1"
                    onClick={() => handleClick("/home")}
                    icon={<House />}
                    children="Home"
                  />

                  <ListItemStyle
                    key="2"
                    children="Application"
                    icon={<Assignment />}
                    onClick={() => handleClick("/home")}
                  />
                </div>
                <ListItemStyle
                  key="3"
                  active={active}
                  icon={<ProfileAvatar user={user} />}
                  subMenu={[
                    {
                      name: "User Profile",
                      icon: <AccountCircle />,
                      onClick: () => {},
                    },
                    {
                      name: "Log Out",
                      icon: <Logout />,
                      onClick: handleLogOut,
                    },
                  ]}
                  children={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <Typography fontWeight={500}>
                        {user?.data?.UserName}
                      </Typography>
                      <Typography fontSize={"0.7rem"}>
                        {user?.data?.UserRole}
                      </Typography>
                    </div>
                  }
                  sx={{
                    width: "auto",
                  }}
                />
              </List>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
