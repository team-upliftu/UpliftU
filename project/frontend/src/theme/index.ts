import { createTheme as createMuiTheme } from "@mui/material";

// MUIのデフォルト色を別の色に変更します。
const themeOptions = {
  palette: {
    primary: {
      main: "#52658f",
      light: "#7483A5",
      dark: "#394664",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#f7f5e6",
      light: "#F8F7EB",
      dark: "#ACABA1",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    background: {
      default: "#e8e8e8",
    },
  },
};

export const createTheme = () => {
  return createMuiTheme(themeOptions);
};