import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const AddProduct = () => {
  // Initialize state variables for form inputs
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/products', {
        name,
        price,
        description
      });
      navigate(`/products/${response.data._id}`);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
      <Header />
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, mb: 6 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Description"
              multiline
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Product
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default AddProduct;
