import React from 'react'
import Header from '../components/Header';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';
import { CafeDatabase } from '../components/CafeDatabase';

function AllCafes() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header></Header>
        <h1>All Cafes!!!</h1>
        <CafeDatabase></CafeDatabase>
      </ThemeProvider>
    </div>
  )
}

export default AllCafes