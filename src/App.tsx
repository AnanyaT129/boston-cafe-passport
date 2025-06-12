import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Home></Home>
      </ThemeProvider>
    </div>
  );
}

export default App;
