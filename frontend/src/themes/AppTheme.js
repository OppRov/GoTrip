import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#f1671A",
      light: "#F07936",
      lighter: "#FFA64D",
      darkest: "#F1671A",
    },
    secondary: {
      main: "#696969",
      light: "#808080",
      lighter: "#A9A9A9",
    },
    tertiary: {
      main: "#222222",
    },
    quaternary: {
      main: "#FFFFFF",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
          },
        },
      },
    },
  },
});
