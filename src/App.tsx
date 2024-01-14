import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {
  Routes,
  Route,
} from "react-router-dom";
import AppDrawer from "./components/dashboard/Drawer";
import AppTopBar from "./components/dashboard/AppTopBar";
import { red } from "@mui/material/colors";
import AppBreadCrumbs from "./components/dashboard/AppBreadCrumbs";
import StaffList from "./pages/StaffList";
import AuthProvider, {
  LoginPage,
  RequireAuth,
} from "./components/AuthProvider";
import CopyrightText from "./components/dashboard/CopyrightText";
import MemberDetails from "./pages/MemberDetails";
import AddEditStaffMember from "./pages/AddEditStaffMember";
import AllAppointments from "./pages/AllAppointments";
import { getStaffList } from "./redux/staffSlice";
import { useAppDispatch } from "./redux/hooks";

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
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    dispatch(getStaffList());
  }, [dispatch]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
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
              <Routes>
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <StaffList />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/staff/add"
                  element={
                    <RequireAuth>
                      <AddEditStaffMember />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/staff/edit/:memberId"
                  element={
                    <RequireAuth>
                      <AddEditStaffMember isEdit />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/staff/:memberId"
                  element={
                    <RequireAuth>
                      <MemberDetails />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/appointments"
                  element={
                    <RequireAuth>
                      <AllAppointments />
                    </RequireAuth>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
              </Routes>

              <CopyrightText />
            </Container>
          </Box>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}
