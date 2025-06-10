import React from 'react';
import { Auth, getAuth, User, onAuthStateChanged } from 'firebase/auth';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export default function LogInOut(): React.ReactElement {
    const [auth, setAuth] = React.useState<Auth>(getAuth());
    const [loggedInUser, setLoggedInUser] = React.useState<User | undefined>(undefined);
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedInUser(user);
            } else {
                setLoggedInUser(undefined);
            }
        });
    }, [auth]);

    // Handles event that user clicks "Log Out" button.
    function handleOpenLogOut() {
        setOpen(true);
    }

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
    }

    return (
        <div>
            {
                (loggedInUser === undefined)
                    ? <Link to={"/login"}><Button color="secondary">Log In</Button></Link>
                    : <Button color="secondary" onClick={handleOpenLogOut}>Log Out</Button>
            }
            < Dialog open={open} onClose={handleCloseLogOut} >
                <DialogTitle id="alert-dialog-title">
                    {"Log Out?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDismissLogOut}>Nevermind</Button>
                    <Button onClick={handleConfirmLogOut}>Log Out</Button>
                </DialogActions>
            </Dialog >
        </div>
    )
}
