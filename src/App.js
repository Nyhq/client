import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList'; 
import AddProduct from './components/AddProduct'; 
import ProductDetail from './components/ProductDetail';
import UpdateProduct from './components/UpdateProduct';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} /> {/* Route to ProductList component */}
        <Route path="/add" element={<AddProduct />} /> {/* Route to AddProductForm component */}
        <Route path="/products/:id" element={<ProductDetail />} /> {/* Route to ProductDetail component */}
        <Route path="/products/:id/update" element={<UpdateProduct />} /> {/* Route to UpdateProductForm component */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
