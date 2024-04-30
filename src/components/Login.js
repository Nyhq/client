import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

// Add state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      navigate('/products');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
          <Box mb={2}>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <Box mt={2} textAlign="center">
              <Button variant="contained" color="primary" type="submit" size="large">
                Login
              </Button>
            </Box>
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body1" gutterBottom>
              Don't have an account?{' '}
              <Link to="/register">
                Register
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
