import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const CopyrightText = () => {
  return (
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
  );
};

export default CopyrightText;
