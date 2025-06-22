import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Organization.css';
import { Header, Footer } from '../index';

const Organization = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clickTimeout, setClickTimeout] = useState(null);

  const organization = {
    id: id,
    name: `Organization ${id}`,
    services: [
      { id: 1, name: "Medical Necessity", description: "We provide critical medical services.", author: "Admin", creationDate: "2023-01-01", rules: 3 },
      { id: 2, name: "Health Insurance", description: "Access to a wide range of health insurance plans.", author: "Admin", creationDate: "2023-02-01", rules: 2 },
      { id: 3, name: "Employee Wellness", description: "Programs designed to support employee health and well-being.", author: "Admin", creationDate: "2023-03-01", rules: 4 },
      { id: 4, name: "Health Insurance", description: "Access to a wide range of health insurance plans.", author: "Admin", creationDate: "2023-02-01", rules: 2 },
    ],
  };

  const handleServiceClick = (serviceId) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    const timeout = setTimeout(() => {
      navigate(`/service/${serviceId}`);
    }, 250);

    setClickTimeout(timeout);
  };

  const handleServiceDoubleClick = (serviceId, serviceName) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    navigate(`/rules/${serviceId}`, { state: { serviceName } }); // Pass service name
  };

  return (
    <>
      <Header />
      <div className="organization-container">
        <h2>Services Offered</h2>
        <div className="services-container">
          {organization.services.map((service) => (
            <div 
              key={service.id} 
              className="service-box" 
              onClick={() => handleServiceClick(service.id)} 
              onDoubleClick={() => handleServiceDoubleClick(service.id, service.name)} // ✅ Fix: Pass service object
            >
              <h3 className="service-title">{service.name}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Organization;
