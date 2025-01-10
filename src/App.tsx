import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "./routes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Set default theme to light
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={routers} />
  </ThemeProvider>
);

export default App;
