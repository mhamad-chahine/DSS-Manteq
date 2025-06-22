import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import logo2 from "../../Assets/Images/logo2.png";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = ({ initialUser }) => {
    const navigate = useNavigate(); // Initialize navigate for navigation
    const [user, setUser] = useState(initialUser || { name: "", email: "", phone: "", photo: "" });
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleLogout = () => {
        navigate("/login"); // Redirect to login page
    };

    const handleViewProfile = () => {
        navigate("/profile"); // Navigate to profile page
    };

    return (
        <Fragment>
            <header className="header">
                <img src={logo2} alt="Company Logo" className="logo-admin" />
                <h1 className="header-title">DECISION SUPPORT SYSTEM</h1>
                <div className="user-info" onClick={toggleDropdown}>
                    <FontAwesomeIcon icon={faUser} className="user-icon" />
                    <span className="user-name">{user.name || "User"}</span>
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button onClick={handleViewProfile} className="dropdown-item">View Profile</button>
                            <button onClick={handleLogout} className="dropdown-item">Logout</button>
                        </div>
                    )}
                </div>
            </header>
        </Fragment>
    );
};

export default Header;
