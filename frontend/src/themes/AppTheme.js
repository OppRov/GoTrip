import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#f1671A",
      light: "#F07936",
    },
    secondary: {
      main: "#696969",
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
