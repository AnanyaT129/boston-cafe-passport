import React, { useState } from 'react';
import 'firebase/auth';  // Firebase Authentication
import Header from '../components/Header';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { firebaseApp } from '../configuration';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FirebaseError } from 'firebase/app';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    // State for email, password, error message, and loading status
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const auth = getAuth(firebaseApp);

    const navigate = useNavigate();
    
    // Register handler
    const handleRegister = async () => {
        setLoading(true);
        setError('');

        try {
            // Try logging in first
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            alert('Account already exists. You are logged in!');
            
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            localStorage.setItem('authToken', idToken);

            navigate('/experiments');
        } catch (loginError) {
            if (loginError instanceof FirebaseError) {
                // If login fails, create a new account
                if (loginError.code === 'auth/user-not-found' || loginError.code === 'auth/invalid-credential') {
                    try {
                        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
                        alert('Account created successfully!');
                        const user = userCredential.user;
                        const idToken = await user.getIdToken();
                        localStorage.setItem('authToken', idToken);

                        navigate('/allCafes');
                    } catch (registerError) {
                        if (registerError instanceof FirebaseError) {
                            setError(registerError.message); // Display error message if account creation fails
                        }
                    }
                } else {
                    setError(loginError.message); // Display login error if not due to user not found
                }
            }
        }
        setLoading(false);
    };

    return (
        <div>
            <Header></Header>
            <Container>
                <Typography variant="h4" gutterBottom>
                    REGISTER
                </Typography>
                <div>
                    <TextField
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button color="primary" variant="contained" onClick={handleRegister} disabled={loading}>
                        {loading ? 'Loading...' : 'Register'}
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </Container>
        </div>
    );
}
