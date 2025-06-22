import React, { useState } from "react";
import "./Profile.css";
import { Header, Footer } from '../index';

const Profile = ({ initialUser, onSave }) => {
    const [user, setUser] = useState(initialUser || { name: "", email: "", phone: "", photo: "" });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUser({ ...user, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        if (onSave) onSave(user); // Call onSave to update centralized state
        console.log("Updated User Info:", user);
    };

    return (
        <>
        <Header />
        
        <div className="profile-container">
            <h2 className="Profile-title">User Profile</h2>

            {/* Profile Photo */}
            <label className="profile-photo-label">
                <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
                <img src={user.photo || "https://via.placeholder.com/80"} alt="Profile" className="profile-photo" />
            </label>

            {/* Editable Fields */}
            <div className="profile-fields">
                <p>
                    <strong>Name:</strong>
                    {isEditing ? (
                        <input name="name" value={user.name} onChange={handleChange} />
                    ) : (
                        user.name
                    )}
                </p>
                <p>
                    <strong>Email:</strong>
                    {isEditing ? (
                        <input name="email" value={user.email} onChange={handleChange} />
                    ) : (
                        user.email
                    )}
                </p>
                <p>
                    <strong>Phone:</strong>
                    {isEditing ? (
                        <input name="phone" value={user.phone} onChange={handleChange} />
                    ) : (
                        user.phone
                    )}
                </p>
            </div>

            {/* Buttons */}
            {isEditing ? (
                <button className="save-button" onClick={handleSave}>Save</button>
            ) : (
                <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
            )}
        </div>

        <Footer />
        </>
    );
};

export default Profile;
