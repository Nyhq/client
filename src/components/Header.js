import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useLogout from './logoutUtil';

const Header = () => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

  const logout = useLogout();


  return (
    <AppBar position="static">
      <Toolbar>
        {isLoggedIn ? (
           <IconButton edge="start" color="inherit" aria-label="logout" onClick={logout}>
           <AccountCircleIcon />
         </IconButton>
        ) : (
          <Link to="/login">
            <IconButton edge="start" color="inherit" aria-label="login">
              <AccountCircleIcon />
            </IconButton>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
