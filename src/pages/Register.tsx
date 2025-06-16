import React, { useState } from 'react';
import 'firebase/auth';  // Firebase Authentication
import Header from '../components/Header';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { db, firebaseApp } from '../configuration';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FirebaseError } from 'firebase/app';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from '../theme';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
          // Try logging in first
          const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
          alert('Account already exists. You are logged in!');
          
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

                      // write new user to the user collection
                      await setDoc(doc(db, 'users', email), {
                        id: idToken,
                        name: name || 'Sample Name', // default to empty string if no displayName
                        email: email
                      });

                      localStorage.setItem('userEmail', email || '');
                      localStorage.setItem('userName', name || '');

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
                          setConfirmPassword(e.target.value)
                          setPasswordMatch(confirmPassword !== '' && confirmPassword !== password)
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
