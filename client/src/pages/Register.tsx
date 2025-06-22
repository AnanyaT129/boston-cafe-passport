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
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from '../theme';
import { GET_USER, SET_NEW_USER } from '../dataModels/queries';
import client from '../apolloClient';

export default function Register() {
    // State for email, password, error message, and loading status
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);

    const auth = getAuth(firebaseApp);

    const navigate = useNavigate();

    const disableRegisterButton : () => boolean = () => {
      return (name === "" || email === "" || !passwordMatch || loading)
    }
    
    // Register handler
    const handleRegister = async () => {
      setLoading(true);
      setError('');

      try {
        // 1. Create user
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created successfully!');

        const user = userCredential.user;
        const idToken = await user.getIdToken();
        localStorage.setItem('authToken', idToken);

        // 2. Save user info in backend via GraphQL
        const { data } = await client.mutate({
          mutation: SET_NEW_USER,
          variables: { name, email },
          context: {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        });

        localStorage.setItem('userEmail', data?.setNewUser?.email ? email : '');
        localStorage.setItem('userName', data?.setNewUser?.name || '');

        // 3. Redirect
        navigate('/allCafes');
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/email-already-in-use') {
            setError('An account with this email already exists. Please log in.');
          } else {
            setError(error.message);
          }
        } else {
          setError('An unknown error occurred.');
        }

        const currentUser = auth.currentUser;
        if (currentUser) {
          try {
            await currentUser.delete();
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName')
          } catch (deleteError) {
            console.error('Failed to clean up Firebase user after failed registration:', deleteError);
          }
        }
      }

      setLoading(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Header></Header>
            <Container style={{marginTop: '3%'}}>
                <Typography variant="h4" gutterBottom>
                    REGISTER
                </Typography>
                <div>
                    <TextField
                        error={name === ""}
                        helperText={name === "" ? "Name cannot be blank" : ""}
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        error={email === ""}
                        helperText={email === "" ? "Email cannot be blank" : ""}
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
                    <TextField
                        error={!passwordMatch}
                        helperText={!passwordMatch ? "Passwords don't match" : ""}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                          const value = e.target.value;
                          setConfirmPassword(value);
                          setPasswordMatch(value === password);
                        }}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button color="primary" variant="contained" onClick={handleRegister} disabled={disableRegisterButton()}>
                        {loading ? 'Loading...' : 'Register'}
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </Container>
        </ThemeProvider>
    );
}
