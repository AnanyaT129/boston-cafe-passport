import React from 'react'
import Header from '../components/Header';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';
import { CafeDatabase } from '../components/CafeDatabase';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function AllCafes() {
  // On first render, get auth and bind `loggedIn` to the onAuthStateChanged listener
  // which listens for when the user logs in/out
  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Header></Header>
          <h1>All Cafes!!!</h1>
          {loggedIn ?
            <CafeDatabase></CafeDatabase> :
            <h3>Please <Link to={"/login"}>login</Link> to see list of cafes</h3>
          }
        </ThemeProvider>
      </div>
    )
}

export default AllCafes