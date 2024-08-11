import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes_count: post.likes_count + 1 };
        }
        return post;
      })
    );
  };

  return (
    <div className="container mt-5">
      <h2>Recent Posts</h2>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onDelete={handleDelete}
          onLike={handleLike}
        />
      ))}
    </div>
  );
}

export default Home;
