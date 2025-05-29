// theme.js
"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#51B545",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#f5f5f5", // Màu nền cho toàn bộ app
      paper: "#ffffff", // Màu nền cho các component như Paper, Card...
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          color: "#ffffff",
          "&.Mui-disabled": {
            backgroundColor: "#cccccc",
            color: "#ffffff",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#51B545",
        },
      },
    },
  },
});

export default theme;
