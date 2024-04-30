import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from './Header';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ProductList = () => {

  // Initialize state variables
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortOption]); // Include sortOption and currentPage as dependencies

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products', {
        params: {
          page: currentPage,
          pageSize: 10, 
          sort: sortOption,
          search: searchQuery
        }
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle search functionality
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products', {
        params: {
          page: 1, // Reset to first page when performing search
          pageSize: 10, 
          sort: sortOption,
          search: searchQuery
        }
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  // Handle sorting functionality
  const handleSort = (option) => {
    let newSortOption = '';
    if (option === 'price_asc' || option === 'price_desc') {
      newSortOption = 'price';
    } else if (option === 'name_asc' || option === 'name_desc') {
      newSortOption = 'name';
    }
    if (option.endsWith('_desc')) {
      newSortOption += '_desc'; 
    }
    setSortOption(newSortOption);
    setCurrentPage(1); // Reset to first page when sort option changes
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Box sx={{ p: 3 }}>
         <Button
          component={Link}
          to="/add" 
          variant="contained"
          color="primary"
          sx={{ position: 'absolute', top: 20, right: 20 }}
        >
          Add Item
        </Button>
      
        <Button
          component={Link}
          to="/about" 
          variant="contained"
          color="primary"
          sx={{ position: 'absolute', top: 20, left: 'calc(50% - 70px)' }}
        >
          About Page
        </Button>
        
        <Typography variant="h2" gutterBottom>Product List</Typography>
        <TextField
          label="Search products"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ mb: 2 }}>
          Search
        </Button>
        <Select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Sort by
          </MenuItem>
          <MenuItem value="price_asc">Price - Ascending</MenuItem>
          <MenuItem value="price_desc">Price - Descending</MenuItem>
          <MenuItem value="name_asc">Name - Ascending</MenuItem>
          <MenuItem value="name_desc">Name - Descending</MenuItem>
        </Select>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '5px' }}>
                <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '5px' }} />
                  <Typography variant="h5" gutterBottom>{product.name}</Typography>
                  <Typography variant="body1">Price: ${product.price}</Typography>
                  <Typography variant="body2">Description: {product.description}</Typography>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box mt={3}>
          <Button
            variant="contained"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            sx={{ ml: 2 }}
          >
            Next
          </Button>
        </Box>
      </Box>

    </Box>
  );
};

export default ProductList;
