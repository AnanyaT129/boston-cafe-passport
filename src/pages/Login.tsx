import React, { useState } from 'react';

import AppHeader from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Container, TextField, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { db, firebaseApp } from '../configuration';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../theme';
import { doc, getDoc } from 'firebase/firestore';

export default function Login () {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const auth = getAuth(firebaseApp);

    const handleLogin = async (): Promise<void> => {
        try {
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            // Store the token for the session
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            localStorage.setItem('authToken', idToken);

            // save user email and name to local storage
            const userData = await getDoc(doc(db, `users/${email}`))
            if (userData.exists()) {
              const ud = userData.data();
              localStorage.setItem('userEmail', ud.email || '');
              localStorage.setItem('userName', ud.name || '');
            }

            navigate('/allCafes');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <AppHeader></AppHeader>
            <Container style={{marginTop: '3%'}}>
                <Typography variant="h4" gutterBottom>
                    LOGIN
                </Typography>
                
                {error && <Typography color="error">{error}</Typography>}
                
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button color="primary" variant="contained" onClick={handleLogin}>
                    Log In
                </Button>

                <Button color="inherit" onClick={() => navigate("/register")}>
                    Register here
                </Button>
            </Container>
        </ThemeProvider>
    )
}