import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user's authentication status

  useEffect(() => {
    fetchProducts();
    checkLoggedInStatus();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const checkLoggedInStatus = () => {
    // Check if user is logged in (e.g., check localStorage for authentication token)
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
  };

  const handleLogout = () => {
    // Perform logout logic (e.g., clear local storage, update state)
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h2>Product List</h2>
      <Link to="/add">
        <button>Add Product</button>
      </Link>
      {/* Render login or logout button based on authentication status */}
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>
              <h3>{product.name}</h3>
            </Link>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
