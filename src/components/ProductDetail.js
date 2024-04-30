import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Typography, Button, CircularProgress, Box, Grid, Card, CardContent, CardMedia } from '@mui/material'; 
import axios from 'axios';
import Header from './Header';

const ProductDetail = () => {
    // Initialize product state variable
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

// Fetch product details from the server
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // Handle back to list button
  const handleBackToList = () => {
    navigate('/products');
  };

  // Handle delete product
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
      <Header />
      <Box sx={{ p: 3 }}>
        {product ? (
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h2" gutterBottom>{product.name}</Typography>
                  <Typography variant="body1" gutterBottom>Price: ${product.price}</Typography>
                  <Typography variant="body1" gutterBottom>Description: {product.description}</Typography>
                  <Typography variant="body2" gutterBottom>Manufacturer: {product.manufacturer}</Typography>
                  <Typography variant="body2" gutterBottom>Model: {product.model}</Typography>
                  <Typography variant="body2" gutterBottom>UPC: {product.upc}</Typography>
                  <Button component={Link} to={`/products/${id}/update`} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Update
                  </Button>
                  <Button href={product.url} target="_blank" variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
                    View on Best Buy
                  </Button>
                  <Button onClick={handleBackToList} variant="contained" sx={{ mt: 2, ml: 2 }}>
                    Back to Product List
                  </Button>
                  <Button onClick={handleDelete} variant="contained" color="error" sx={{ mt: 2, ml: 2 }}>
                    Delete Product
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
};

export default ProductDetail;
