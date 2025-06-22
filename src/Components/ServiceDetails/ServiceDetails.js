import React from 'react';
import { useParams } from 'react-router-dom';
import './ServiceDetails.css'; // Import CSS file
import { Header, Footer } from '../index';

const ServiceDetails = () => {
  const { serviceId } = useParams();

  // Example service data (Replace with your actual data source)
  const servicesData = [
    {
      id: 1,
      name: "Medical Necessity",
      description: "We provide critical medical services.",
      author: "Admin",
      creationDate: "2023-01-01",
      rules: 3
    },
    {
      id: 2,
      name: "Health Insurance",
      description: "Access to a wide range of health insurance plans.",
      author: "Admin",
      creationDate: "2023-02-01",
      rules: 2
    },
    {
      id: 3,
      name: "Employee Wellness",
      description: "Programs designed to support employee health and well-being.",
      author: "Admin",
      creationDate: "2023-03-01",
      rules: 4
    },
    {
      id: 4,
      name: "Health Insurance",
      description: "Access to a wide range of health insurance plans.",
      author: "Admin",
      creationDate: "2023-02-01",
      rules: 2
    },
  ];

  const service = servicesData.find(s => s.id === parseInt(serviceId));

  return (
    <>
      <Header />
      <div className="service-details-container">
        {/* <h1>Service Details</h1> */}
        <div className="service-detail-box">
          <div className="service-info">
            <h2 className="service-name">{service?.name}</h2> {/* Title */}
            <p className="service-description">{service?.description}</p> {/* Description */}
            <div className="meta-info">
              <p><strong>Author:</strong> {service?.author}</p>
              <p><strong>Creation Date:</strong> {service?.creationDate}</p>
            </div>
            <p className="number-of-rules">Number of Rules: {service?.rules}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetails;
