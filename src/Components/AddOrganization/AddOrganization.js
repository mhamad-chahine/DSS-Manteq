import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddOrganization.css";
import { FaCloudUploadAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { Header, Footer } from "../index";

const AddOrganization = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationAddress, setOrganizationAddress] = useState("");
  const [administratorName, setAdministratorName] = useState("");
  const [administratorPhone, setAdministratorPhone] = useState("");
  const [administratorEmail, setAdministratorEmail] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [organizationIcon, setOrganizationIcon] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newOrganization = {
      organizationName,
      organizationAddress,
      administratorName,
      administratorPhone,
      administratorEmail,
      generatedPassword,
      organizationIcon,
    };

    navigate("/superadmin", { state: { newOrganization } });

    setOrganizationName("");
    setOrganizationAddress("");
    setAdministratorName("");
    setAdministratorPhone("");
    setAdministratorEmail("");
    setGeneratedPassword("");
    setOrganizationIcon(null);
  };

  return (
    <>
      <Header />
      <div className="add-organization-container">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Organization Details</h3>
            <div className="org-details-grid">
              <div className="form-group">
                <label htmlFor="organizationName">Organization Name:</label>
                <input
                  type="text"
                  id="organizationName"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="organizationAddress">
                  Organization Address:
                </label>
                <input
                  type="text"
                  id="organizationAddress"
                  value={organizationAddress}
                  onChange={(e) => setOrganizationAddress(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Organization Icon:</label>
              <div
                className="drop-area"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  setOrganizationIcon(file);
                }}
              >
                {organizationIcon ? (
                  <img
                    src={URL.createObjectURL(organizationIcon)}
                    alt="Organization Icon"
                    className="preview-icon"
                  />
                ) : (
                  <div className="upload-placeholder">
                    <FaCloudUploadAlt className="upload-icon" />
                    <span>Drag & Drop or Click to Browse</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="icon-upload"
                accept="image/*"
                onChange={(e) => setOrganizationIcon(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Administrator Details</h3>
            <div className="admin-details-grid">
              <div className="form-group">
                <label htmlFor="administratorName">Administrator Name:</label>
                <input
                  type="text"
                  id="administratorName"
                  value={administratorName}
                  onChange={(e) => setAdministratorName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="administratorPhone">Administrator Phone:</label>
                <input
                  type="tel"
                  id="administratorPhone"
                  value={administratorPhone}
                  onChange={(e) => setAdministratorPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="administratorEmail">Administrator Email:</label>
              <input
                type="email"
                id="administratorEmail"
                value={administratorEmail}
                onChange={(e) => setAdministratorEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Admin Password</h3>
            <div className="form-group">
              <label htmlFor="generatedPassword">Generated Password:</label>
              <div className="password-field">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="generatedPassword"
                  value={generatedPassword}
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type="button"
                className="generate-password-button"
                onClick={() =>
                  setGeneratedPassword(Math.random().toString(36).slice(-8))
                }
              >
                Generate Password
              </button>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Create Organization
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddOrganization;
