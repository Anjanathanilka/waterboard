import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      100: "#d6e4f1",
      200: "#adcae2",
      300: "#85afd4",
      400: "#5c95c5",
      500: "#337ab7",
      600: "#296292",
      700: "#1f496e",
      800: "#143149",
      900: "#0a1825",
    },
    secondary: {
      main: "#D9D9D9",
      100: "#f7f7f7",
      200: "#efefef",
      300: "#e7e7e7",
      400: "#dfdfdf",
      500: "#d7d7d7",
      600: "#acacac",
      700: "#818181",
      800: "#565656",
      900: "#2b2b2b",
    },
    light: {
      main: "#F9F9F9",
    },
    background: {
      main: "#F6F8FB",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 500,
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
    },
    common: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: "1rem",
    },
  },
});

export default theme;
