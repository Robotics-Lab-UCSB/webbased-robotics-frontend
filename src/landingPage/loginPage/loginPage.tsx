import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Switch } from '@mui/material';
import './loginPage.css';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(true); // Toggle state for Register/Login
  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const endpoint = isRegister
        ? 'http://127.0.0.1:8000/auth/create_user/'
        : 'http://127.0.0.1:8000/auth/login_user/';
      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include', // Include cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `${isRegister ? 'Registration' : 'Login'} failed`);
      }

      setSuccess(true);
      
      console.log(isRegister);
      if (!isRegister) {
        console.log("should not happen")
        setIsRegisterSuccess(false);
        setTimeout(() => {
          window.location.href = '/home'; // Redirect to home on successful login
        }, 1000);
      } else {
        setIsRegisterSuccess(true);
        setIsRegister(false);
      }
    } catch (err: any) {
      setError(err.message);
      if ("User with this email already exists" === err.message) {
        setIsRegister(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <Container maxWidth="xs" className="form-box">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontFamily: 'Roboto, sans-serif',
                color: '#000', // Modern black text color
                fontWeight: 500,
              }}
            >
              {isRegister ? 'Register' : 'Login'}
            </Typography>

            <TextField
              label="Email Address"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  color: '#000', // Black text inside input
                },
                '& .MuiInputLabel-root': {
                  color: '#333', // Slightly lighter label color
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#000', // Black border on hover
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ minLength: 6 }}
              sx={{
                '& .MuiInputBase-root': {
                  color: '#000', // Black text inside input
                },
                '& .MuiInputLabel-root': {
                  color: '#333', // Slightly lighter label color
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#000', // Black border on hover
                },
              }}
            />

            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {error}
              </Typography>
            )}
            {success && (
              <Typography
                color="primary"
                variant="body2"
                sx={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {!isRegister
                  ? isRegisterSuccess
                    ? 'Registration successful! You can now log in.'
                    : 'Login successful! Redirecting...'
                  : null}

              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: '#000', // Sleek black button
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#333', // Slightly lighter hover effect
                },
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              {isRegister ? 'Register' : 'Login'}
            </Button>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography sx={{ fontFamily: 'Roboto, sans-serif', color: '#333' }}>
                {isRegister ? 'Already have an account?' : "Don't have an account?"}
              </Typography>
              <Switch
                checked={!isRegister}
                onChange={() => setIsRegister((prev) => !prev)}
                color="primary"
              />
            </Box>
          </Box>
        </Container>
      </div>
      <div className="image-container">
        <div className="corner-text">Virtual Lab©</div>
        <img src="/main_page/login_background.png" alt="Right-side Visual" />
      </div>
    </div>
  );
};

export default AuthPage;
