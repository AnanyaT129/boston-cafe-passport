import React from 'react'
import Box from "@mui/material/Box";
import Header from "../components/Header";
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from '../theme';
import ProfileTabs from '../components/ProfileTabs';

export default function Profile() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Header></Header>
        <ProfileTabs></ProfileTabs>
      </Box>
    </ThemeProvider>
  );
}