import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useTheme from '@mui/material/styles/useTheme';
import { Link } from 'react-router-dom';

export default function AppHeader() {
  const theme = useTheme();

  // determine route to link to based on current signin
  const allCafePath: string = (localStorage.getItem('authToken') === null) ? "/login" : "/allCafes"
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={"primary"}>
        <Toolbar>
          <Link to={allCafePath}><Button color="secondary">Explore Cafes</Button></Link>
          <Typography variant="h6" color={theme.palette.primary.contrastText} component="div" sx={{ flexGrow: 1 }}>
            Boston Bean Scene
          </Typography>
          <Link to={"/about"}><Button color="secondary">About</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
