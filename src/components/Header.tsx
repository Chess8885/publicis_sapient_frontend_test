import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export default function Header() {

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Bibliothèque d'Henri Pottier
          </Typography>
        </Toolbar>
        <Box />
      </AppBar>
    </Box >
  );
}
