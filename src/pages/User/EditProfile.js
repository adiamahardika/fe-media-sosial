import React, { useState, useEffect } from "react";
import axios from "axios";

function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    interests: "",
    profile_picture: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/1")
      .then((response) => {
        const user = response.data;
        setFormData({
          name: user.name,
          email: user.email,
          bio: user.bio,
          interests: user.interests,
          profile_picture: null,
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_picture: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios
      .put("http://localhost:8000/api/users/1", data)
      .then((response) => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            className="form-control"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Interests</label>
          <input
            type="text"
            className="form-control"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="file"
            className="form-control-file"
            name="profile_picture"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
