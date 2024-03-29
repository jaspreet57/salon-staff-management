import * as React from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
  children?: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom flexGrow={1}>
      {children}
    </Typography>
  );
}

export default Title;
