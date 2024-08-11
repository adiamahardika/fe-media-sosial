import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/User/Register";
import EditProfile from "./pages/User/EditProfile";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/Post/CreatePost";
import EditPost from "./pages/Post/EditPost";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
