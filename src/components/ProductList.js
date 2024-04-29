import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      {/* Add a button to navigate to the add product form */}
      <Link to="/add">
        <button>Add Product</button>
      </Link>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {/* Convert each product item to a clickable link */}
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
