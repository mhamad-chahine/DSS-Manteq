import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import "./SuperAdmin.css";

import { Header, Footer } from "../index";

// Sample organization images (Replace with actual paths)
import org1 from "../../Assets/Images/life.png";
import org2 from "../../Assets/Images/vps.jpg";
import org3 from "../../Assets/Images/sgh.png";

const SuperAdmin = () => {
  const [organizations, setOrganizations] = useState([
    { id: 1, name: "LIFE", image: org1 },
    { id: 2, name: "VPS", image: org2 },
    { id: 3, name: "SGH", image: org3 },
  ]);

  const [deleteOrg, setDeleteOrg] = useState(null); // Store org to delete
  const isOrganizationAdded = useRef(false);
  const userRole = "SuperAdmin";
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userRole !== "SuperAdmin") {
      navigate("/");
    }

    if (location.state?.newOrganization && !isOrganizationAdded.current) {
      const newOrg = location.state.newOrganization;
      setOrganizations((prevOrgs) => [
        ...prevOrgs,
        {
          id: Date.now(),
          name: newOrg.organizationName,
          image: org1, // Default image
        },
      ]);
      isOrganizationAdded.current = true;
    }
  }, [userRole, navigate, location.state]);

  const handleDoubleClick = (id) => {
    navigate(`/organization/${id}`);
  };

  // Show delete confirmation popup
  const handleRemoveOrganization = (org) => {
    setDeleteOrg(org);
  };

  // Confirm deletion
  const confirmDelete = () => {
    setOrganizations((prevOrgs) => prevOrgs.filter((org) => org.id !== deleteOrg.id));
    setDeleteOrg(null);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setDeleteOrg(null);
  };

  return (
    <div className="superadmin-container">
      <Header />

      <div className="organization-section">
        <div className="organizations-box">
          <div className="organizations-header">
            <h2>Organizations</h2>
            <Link to="/add-organization" className="add-organization-box">
              <FaPlus className="add-icon" />
            </Link>
          </div>
          <div className="organizations-list">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="organization-card"
                onDoubleClick={() => handleDoubleClick(org.id)}
              >
                <img src={org.image} alt={org.name} className="organization-icon" />
                <p className="organization-name">{org.name}</p>
                <button className="remove-button" onClick={() => handleRemoveOrganization(org)}>
                  <FaTrash className="remove-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {deleteOrg && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete <strong>{deleteOrg.name}</strong>?</p>
            <div className="popup-buttons">
              <button onClick={confirmDelete} className="confirm-btn">Delete</button>
              <button onClick={cancelDelete} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SuperAdmin;
