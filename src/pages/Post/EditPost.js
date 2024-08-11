import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    content: "",
    media: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then((response) => {
        setFormData({
          content: response.data.content,
          media: null,
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [id]);

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
      .post(`http://localhost:8000/api/posts/${id}`, data)
      .then((response) => {
        alert("Post updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Edit Post</h2>
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
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
