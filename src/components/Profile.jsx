import { useFavorites } from "../context/FavoritesContext";

import "../blocks/Profile.css";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Profile({
  currentUser,
  handleLogout,
  handleSaveProfile,
  token,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUserName] = useState(currentUser?.username || "");
  const [profileImage, setProfileImage] = useState(
    currentUser?.profileImage || ""
  );

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setUserName(currentUser?.username || "");
    setProfileImage(currentUser?.profileImage || "");
  };

  const handleSaveClick = async () => {
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username.trim() !== "" ? username : undefined,
          profileImage: profileImage.trim() !== "" ? profileImage : undefined,
        }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        handleSaveProfile(updatedUser);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        const err = await res.json();
        console.error("Failed to update profile:", err.message);
        toast.error(err.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="profile">
      <h2 className="profile__title">Profile</h2>

      <div className="profile__info">
        <img
          src={currentUser?.profileImage || "/default-avatar.png"}
          alt="Profile"
          className="profile__avatar"
        />

        <div className="profile__details">
          {isEditing ? (
            <>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
              <label htmlFor="">Profile Image URL</label>
              <input
                type="text"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              />
            </>
          ) : (
            <>
              <strong>Username:</strong> {currentUser?.username}
              <br />
              <strong>Email:</strong> {currentUser?.email}
            </>
          )}
        </div>

        <div className="profile__actions">
          {isEditing ? (
            <>
              <button className="profile__save-btn" onClick={handleSaveClick}>
                Save
              </button>
              <button
                className="profile__cancel-btn"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="profile__edit-btn" onClick={handleEditClick}>
              Edit Profile
            </button>
          )}
          <button className="profile__logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
