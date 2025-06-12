import React from 'react';
import './App.css';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Home from './pages/Home';

function App() {
  const theme = useTheme();
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Home></Home>
      </ThemeProvider>
    </div>
  );
}

export default App;
