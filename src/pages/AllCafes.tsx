import React from 'react'
import Header from '../components/Header';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';
import { CafeDatabase } from '../components/CafeDatabase';
import { Link } from 'react-router-dom';

function AllCafes() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Header></Header>
          <h1>All Cafes!!!</h1>
          {localStorage.getItem('authToken') !== null ?
            <CafeDatabase></CafeDatabase> :
            <h3>Please <Link to={"/login"}>login</Link> to see list of cafes</h3>
          }
        </ThemeProvider>
      </div>
    )
}

export default AllCafes