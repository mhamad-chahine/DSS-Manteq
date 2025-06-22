import React, { useEffect } from 'react';
import './MainPage.css';
import { Header, Footer } from '../index';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check user role from localStorage
    const userRole = localStorage.getItem('userRole');

    console.log('User role:', userRole); // Debugging log

    if (userRole === 'SuperAdmin') {
      navigate('/superadmin'); // Navigate to SuperAdmin page
    } else if (userRole === 'OrganizationAdmin') {
      navigate('/organizationadmin'); // Navigate to OrganizationAdmin page
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
};

export default MainPage;
