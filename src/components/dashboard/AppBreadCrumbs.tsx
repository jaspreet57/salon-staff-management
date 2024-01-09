import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';


const AppBreadCrumbs = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ pb: 2 }}>
      <Link underline="hover" color="inherit" to="/" component={RouterLink}>
        Dashboard
      </Link>
      <Typography color="text.primary">Staff</Typography>
    </Breadcrumbs>
  );
};

export default AppBreadCrumbs;