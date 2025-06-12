import React from 'react'
import Header from '../components/Header';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from '../theme';

function About() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header></Header>
        <h1>About!!!</h1>
      </ThemeProvider>
    </div>
  )
}

export default About