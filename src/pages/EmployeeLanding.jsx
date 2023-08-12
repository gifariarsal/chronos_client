import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

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

const EmployeeLanding = () => {
  return (
    <div>EmployeeLanding</div>
  )
}

export default withAuth(EmployeeLanding);