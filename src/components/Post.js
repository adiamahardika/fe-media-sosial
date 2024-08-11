import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";

function Post({ post, onDelete, onLike }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${post.id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [post.id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8000/api/comments`, {
        post_id: post.id,
        content: newComment,
      })
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment("");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleReply = (reply) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === reply.parent_id) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          };
        }
        return comment;
      })
    );
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.user.name}</h5>
        <p className="card-text">{post.content}</p>
        {post.media_url && (
          <img src={post.media_url} alt="post media" className="img-fluid" />
        )}
        <button onClick={onLike} className="btn btn-outline-primary me-2">
          Like ({post.likes_count})
        </button>
        <button onClick={onDelete} className="btn btn-outline-danger me-2">
          Delete
        </button>

        <div className="mt-4">
          <h6>Comments</h6>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} onReply={handleReply} />
          ))}

          <form onSubmit={handleCommentSubmit} className="mt-3">
            <div className="form-group">
              <textarea
                className="form-control"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Submit Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
