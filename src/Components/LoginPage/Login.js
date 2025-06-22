import "./Login.css";
import logo from "../../Assets/Images/dss.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserType = () => {} }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = "http://45.9.190.133:6222/manteq/dss/api/1.0/public";

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if credentials match the hard-coded organization admin user
    if (username === "orgadmin@manteq.com" && password === "admin") {
      // Set token and user type in localStorage if needed
      const fakeToken = "fake-organizationadmin-token";
      localStorage.setItem("token", fakeToken);
      localStorage.setItem("userRole", "OrganizationAdmin");

      setUserType("OrganizationAdmin");
      navigate("/organizationadmin");
      return;
    }

    // If not the hard-coded user, attempt API login
    try {
      const response = await fetch(
        `${BASE_URL}/authentication/login?login=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        {
          method: "POST",
          headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);

        if (data.role === "SuperAdmin") {
          setUserType("SuperAdmin");
          navigate("/superadmin");
        } else if (data.role === "OrganizationAdmin") {
          setUserType("OrganizationAdmin");
          navigate("/Or");
        } else {
          setError("Invalid credentials");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="sidebar"></div>
      <div className="main-content">
        <img src={logo} alt="DSS Logo" className="logo" />

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br/>

          {error && <p className="error-message">{error}</p>}

          <a href="/forgot-password" className="forgot-password">Forgot password?</a>

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
