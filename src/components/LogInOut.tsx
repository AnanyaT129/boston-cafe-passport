import React from 'react';
import { Auth, getAuth } from 'firebase/auth';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export default function LogInOut(): React.ReactElement {
    const [auth, setAuth] = React.useState<Auth>(getAuth());
    const [open, setOpen] = React.useState<boolean>(false);

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
                localStorage.getItem('authToken') !== null
                    ? <Button color="secondary" onClick={handleOpenLogOut}>Log Out</Button>
                    : <Button color="secondary">Log In<Link to={"/login"}></Link></Button>
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
