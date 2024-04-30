import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList'; 
import AddProduct from './components/AddProduct'; 
import ProductDetail from './components/ProductDetail';
import UpdateProduct from './components/UpdateProduct';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Route to Login component */}
        <Route path="/products" element={<ProductList />} /> {/* Route to ProductList component */}
        <Route path="/add" element={<AddProduct />} /> {/* Route to AddProductForm component */}
        <Route path="/products/:id" element={<ProductDetail />} /> {/* Route to ProductDetail component */}
        <Route path="/products/:id/update" element={<UpdateProduct />} /> {/* Route to UpdateProductForm component */}
        <Route path="/login" element={<Login />} /> {/* Route to Login component */}
        <Route path="/register" element={<Register />} /> {/* Route to Register component */}
        <Route path="/about" element={<About />} /> {/* Route to About component */}

      </Routes>
    </BrowserRouter>
  );
};

export default App;
