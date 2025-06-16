import React from 'react';
import { Auth, getAuth, User, onAuthStateChanged } from 'firebase/auth';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../theme';
import ProfileMenu from './ProfileMenu';

export default function LogInOut(): React.ReactElement {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

    const navigate = useNavigate();

    // On first render, initialize auth and set up a trigger to toggle loggedInUser
    // from onAuthStateChanged, which listens for when the user logs in/out 
    const auth: Auth = React.useMemo<Auth>(getAuth, []);
    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user ? setLoggedIn(true) : setLoggedIn(false)
        });
    }, []);

    const [open, setOpen] = React.useState<boolean>(false);

    // Handles event that user closes the Log Out dialogue.
    function handleCloseLogOut() {
        setOpen(false);
    }

    function handleDismissLogOut() {
        handleCloseLogOut();
    }

    function handleConfirmLogOut() {
        logOut();
        handleCloseLogOut();
    }

    function logOut() {
        signOut(auth);
        localStorage.removeItem('authToken');
        navigate("/")
    }

    return (
        <ThemeProvider theme={theme}>
            {
                loggedIn
                    ? <ProfileMenu setOpen={setOpen}></ProfileMenu>
                    : <Link to={"/login"}><Button color="secondary">Log In</Button></Link>
            }
            <Dialog open={open} onClose={handleCloseLogOut} >
                <DialogTitle id="alert-dialog-title">
                    {"Log Out?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDismissLogOut}>Never mind</Button>
                    <Button onClick={handleConfirmLogOut}>Log Out</Button>
                </DialogActions>
            </Dialog >
        </ThemeProvider>
    )
}
