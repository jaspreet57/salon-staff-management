import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const AppBreadCrumbs = () => {
  const location = useLocation();

  const path = location.pathname;

  let breadcrumbs = [
    <Typography key="s-1" color="text.primary">
      Staff
    </Typography>,
  ];

  if (path.startsWith("/staff/edit")) {
    breadcrumbs = [
      <Typography color="inherit" key="e-1">
        Staff
      </Typography>,
      <Typography color="text.primary" key="e-2">
        Edit
      </Typography>,
    ];
  } else if (path.startsWith("/staff/add")) {
    breadcrumbs = [
      <Typography color="inherit" key="a-1">
        Staff
      </Typography>,
      <Typography color="text.primary" key="a-2">
        Add
      </Typography>,
    ];
  } else if (path.startsWith("/staff/")) {
    breadcrumbs = [
      <Typography color="inherit" key="ap-1">
        Staff
      </Typography>,
      <Typography color="text.primary" key="ap-2">
        Appointments
      </Typography>,
    ];
  } else if (path.startsWith("/appointments")) {
    breadcrumbs = [
      <Typography color="text.primary" key="aap-1">
        Appointments
      </Typography>,
    ];
  }
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ pb: 2 }}>
      <Link underline="hover" color="inherit" to="/" component={RouterLink}>
        Dashboard
      </Link>
      {breadcrumbs.map((el) => el)}
    </Breadcrumbs>
  );
};

export default AppBreadCrumbs;
