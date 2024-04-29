import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProductForm = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const navigate = useNavigate(); // Move useNavigate here

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response =  await axios.put(`http://localhost:3000/products/${id}`, product);
      // Redirect to the product detail page after update
      navigate(`/products/${id}`); // Use navigate here
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  
  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
        <textarea value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
