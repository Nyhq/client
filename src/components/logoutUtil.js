import { useNavigate } from 'react-router-dom';

const logout = () => {
  const navigate = useNavigate();

  // Clear the JWT token from local storage or session storage
  localStorage.removeItem('token');
  
  // Redirect or navigate to the login page
  navigate.push('/login');
};

export default logout;
