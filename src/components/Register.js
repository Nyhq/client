import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Button, TextField, CircularProgress, Grid, Paper, Box } from '@mui/material'; 
import axios from 'axios';

const Register = () => {
// Initialize state variables for form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await axios.post('http://localhost:5050/auth/register', {
        username,
        email,
        password
      });
      // Display a success message
      alert('User registered successfully!');
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />
            <Box mt={2} textAlign="center">
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Register'}
              </Button>
            </Box>
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body1" gutterBottom>
              Already have an account?{' '}
              <Link to="/login">
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
