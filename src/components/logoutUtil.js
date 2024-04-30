import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear the JWT token from local storage or session storage
    localStorage.removeItem('token');
    
    // Redirect or navigate to the login page
    navigate('/login');
  };

  return logout;
};

export default useLogout;
