import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EmployeeManagement from '../components/admin/EmployeeManagement';

function withAuth(Component) {
  return function WrappedComponent(props) {
    const isAuthenticated = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

const AdminLanding = () => {
  return (
    <Box>
      <Navbar />
        <Box w={"full"} pt={"60px"}>
          <EmployeeManagement />
        </Box>
    </Box>
  );
}

export default withAuth(AdminLanding);