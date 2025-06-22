import React, { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import "./OrgAdmin.css";
import { Header, Footer } from "../index";

const OrgAdmin = () => {
    const [admins, setAdmins] = useState([
        { id: 1, name: "Mohamad Chahine", email: "mohamad@example.com" },
        { id: 2, name: "Hussam Khaled", email: "hussam@example.com" },
        { id: 3, name: "Ahmad Walid", email: "ahmad@example.com" },
    ]);

    const [users, setUsers] = useState([
        { id: 4, name: "Mohamad Chahine", email: "Mohamad.abouhahine@outlook.com", phone: "70503047", photo: null },
        { id: 5, name: "Hussam Khaled", email: "Hussam.Khaled@gmail.com", phone: "70123456", photo: null },
        { id: 6, name: "Ahmad Walid", email: "ahmad.walid@gmail.com", phone: "70654321", photo: null },
    ]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [showAdminForm, setShowAdminForm] = useState(false);
    const [showUserForm, setShowUserForm] = useState(false);
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState(""); // New state for admin email
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userPhoto, setUserPhoto] = useState(null);

    const handleUserClick = (user) => setSelectedUser(user);

    const addAdmin = () => {
        if (!adminName.trim() || !adminEmail.trim()) return;
        setAdmins([...admins, { id: admins.length + 1, name: adminName, email: adminEmail }]);
        setAdminName("");
        setAdminEmail(""); // Reset email field
        setShowAdminForm(false);
    };

    const removeAdmin = () => {
        if (admins.length === 0) return;
        setAdmins(admins.slice(0, -1));
    };

    const addUser = () => {
        if (!userName.trim() || !userEmail.trim() || !userPhone.trim()) return;
        const newUser = {
            id: users.length + 4,
            name: userName,
            email: userEmail,
            phone: userPhone,
            photo: userPhoto
        };
        setUsers([...users, newUser]);
        resetUserForm();
        setShowUserForm(false);
    };

    const resetUserForm = () => {
        setUserName("");
        setUserEmail("");
        setUserPhone("");
        setUserPhoto(null);
    };

    const removeUser = () => {
        if (users.length === 0) return;
        setUsers(users.slice(0, -1));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserPhoto(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Header />

            <div className="org-admin">
                {/* Administrators Section */}
                <div className="section">
                    <h2>Administrators</h2>
                    <div className="user-box">
                        {admins.map((admin) => (
                            <button key={admin.id} className="user-btn">{admin.name}</button>
                        ))}
                    </div>
                    <div className="controls">
                        <button className="remove-btn" onClick={removeAdmin}>
                            <FaMinusCircle className="icon remove-icon" />
                        </button>
                        <button className="add-btn" onClick={() => setShowAdminForm(true)}>
                            <FaPlusCircle className="icon add-icon" />
                        </button>
                    </div>
                    {showAdminForm && (
                        <div className="form-popup styled-form">
                            <h3>Add New Administrator</h3>
                            <div className="form-group">
                                <label htmlFor="adminName">Name:</label>
                                <input
                                    type="text"
                                    id="adminName"
                                    placeholder="Enter admin name"
                                    value={adminName}
                                    onChange={(e) => setAdminName(e.target.value)}
                                />
                            </div>
                            {/* New email input */}
                            <div className="form-group">
                                <label htmlFor="adminEmail">Email:</label>
                                <input
                                    type="email"
                                    id="adminEmail"
                                    placeholder="Enter admin email"
                                    value={adminEmail}
                                    onChange={(e) => setAdminEmail(e.target.value)}
                                />
                            </div>
                            <div className="button-group">
                                <button className="save-btn" onClick={addAdmin}>Save</button>
                                <button className="cancel-btn" onClick={() => setShowAdminForm(false)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Users Section */}
                <div className="section">
                    <h2>Users</h2>
                    <div className="user-box">
                        {users.map((user) => (
                            <button key={user.id} className="user-btn" onClick={() => handleUserClick(user)}>
                                {user.name}
                            </button>
                        ))}
                    </div>
                    <div className="controls">
                        <button className="remove-btn" onClick={removeUser}>
                            <FaMinusCircle className="icon remove-icon" />
                        </button>
                        <button className="add-btn" onClick={() => setShowUserForm(true)}>
                            <FaPlusCircle className="icon add-icon" />
                        </button>
                    </div>
                    {showUserForm && (
                        <div className="form-popup styled-form">
                            <h3>Add New User</h3>
                            <div className="form-group">
                                <label htmlFor="userName">Name:</label>
                                <input type="text" id="userName" placeholder="Enter user name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userEmail">Email:</label>
                                <input type="email" id="userEmail" placeholder="Enter email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userPhone">Phone:</label>
                                <input type="text" id="userPhone" placeholder="Enter phone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userPhoto">Photo:</label>
                                <input type="file" id="userPhoto" accept="image/*" onChange={handleFileChange} className="hidden-file-input" />
                                <label htmlFor="userPhoto" className="file-upload-button">Choose File</label>
                                <span className="file-upload-label">{userPhoto ? 'File Selected' : 'No file chosen'}</span>
                                {userPhoto && <img src={userPhoto} alt="Preview" className="preview-photo" />}
                            </div>
                            <div className="button-group">
                                <button className="save-btn" onClick={addUser}>Save</button>
                                <button className="cancel-btn" onClick={() => resetUserForm()}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Details */}
                {selectedUser && (
                    <div className="user-info-org">
                        <h3>User Details</h3>
                        {selectedUser.photo ? (
                            <img src={selectedUser.photo} alt={`${selectedUser.name}'s Photo`} className="user-detail-photo" />
                        ) : (
                            <div className="photo-placeholder">Photo</div>
                        )}
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Phone:</strong> {selectedUser.phone}</p>
                        <button className="action-btn">Update</button>
                        <button className="action-btn">Reset Password</button>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default OrgAdmin;
