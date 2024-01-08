import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import AppDrawer from "./components/dashboard/Drawer";
import AppTopBar from "./components/dashboard/AppTopBar";
import { red } from '@mui/material/colors';
import AppBreadCrumbs from "./components/dashboard/AppBreadCrumbs";
import StaffList from "./pages/StaffList";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#00c4a6",
    },
    secondary: {
      main: red[500],
    },
  },
});

export default function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <AppTopBar open={open} toggleDrawer={toggleDrawer} />
        <AppDrawer open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar /> {/** This is added to add toolbar space in body */}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
            
            
            <AppBreadCrumbs />

            <StaffList />





            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ pt: 4 }}
            >
              {"Copyright © "}
              <Link color="secondary" href="./">
                Salon Staff Management
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
