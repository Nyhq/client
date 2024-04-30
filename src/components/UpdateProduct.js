import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button, TextField, CircularProgress } from '@mui/material'; 

const UpdateProductForm = () => {
    // Initialize product state variable
  const { id } = useParams();
  const [product, setProduct] = useState({ name: '', price: '', description: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  // Fetch product details when component mounts or ID changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [id]);

  // Handle form submission to update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while updating product

    try {
      await axios.put(`http://localhost:3000/products/${id}`, product);
      // Redirect to the product detail page after update
      navigate(`/products/${id}`);
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false); // Set loading state back to false after update attempt
    }
  };

  return (
    <div>
      <Typography variant="h2">Edit Product</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          type="number"
          label="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Update Product'}
        </Button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
