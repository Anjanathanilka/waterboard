import { styled } from "@mui/material/styles";
import { useState } from "react";
import { ListItemButton, ListItem, Menu, MenuItem, Fade } from "@mui/material";
import { Link } from "react-router-dom";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";
import { KeyboardArrowDown } from "@mui/icons-material";

const ListItemStyle = ({
  key,
  icon,
  sx,
  isActive,
  subMenu,
  onClick,
  children,
}) => {
  const [anchorEl, setAnchorEl] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <ListItem role="none" sx={{ width: "max-content", ...sx }}>
      <ListItemButton
        sx={{
          textDecoration: "none",
          // position: "absolute",
          height: "50px",
          boxSizing: "border-box",
          fontWeight: { sm: 600, xs: 400 },
          fontSize: { sm: "1.25rem", xs: "1rem" },
        }}
        onClick={(e) => {
          subMenu ? handleMenuClick(e) : onClick(e);
        }}
      >
        {icon}&nbsp;&nbsp;
        {children}
        {subMenu && (
          <>
            &nbsp;
            <KeyboardArrowDown
              fontSize="20px"
              sx={{ display: { sm: "initial", xs: "none" } }}
            />
            <Menu
              anchorEl={anchorEl}
              open={anchorEl}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
            >
              {subMenu.map((item, i) => (
                <MenuItem
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setAnchorEl(null);
                    item.onClick(e);
                  }}
                >
                  {item.icon}&nbsp;&nbsp;
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default ListItemStyle;
