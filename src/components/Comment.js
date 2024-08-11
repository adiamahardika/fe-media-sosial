import React, { useState } from "react";
import axios from "axios";

function Comment({ comment, onReply }) {
  const [reply, setReply] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8000/api/comments`, {
        post_id: comment.post_id,
        parent_id: comment.id,
        content: reply,
      })
      .then((response) => {
        onReply(response.data);
        setReply("");
        setShowReplyForm(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="mb-3">
      <div className="card">
        <div className="card-body">
          <h6>{comment.user.name}</h6>
          <p>{comment.content}</p>
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="btn btn-link"
          >
            Reply
          </button>

          {showReplyForm && (
            <form onSubmit={handleReplySubmit}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Submit Reply
              </button>
            </form>
          )}
        </div>
      </div>
      {comment.replies &&
        comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} onReply={onReply} />
        ))}
    </div>
  );
}

export default Comment;
