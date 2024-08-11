import React, { useState } from "react";
import axios from "axios";

function CreatePost() {
  const [formData, setFormData] = useState({
    user_id: 1,
    content: "",
    media: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      media: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios
      .post("http://localhost:8000/api/posts", data)
      .then((response) => {
        alert("Post created successfully!");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Content</label>
          <textarea
            className="form-control"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Media (optional)</label>
          <input
            type="file"
            className="form-control-file"
            name="media"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
