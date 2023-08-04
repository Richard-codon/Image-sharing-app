//import module from react library
import React, { useState } from 'react';
import './ImageCard.css';

//the main functional component that takes in the imageUrl from the app.js as parameter and the imageId as well
const ImageCard = ({ imageUrl, imageId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  
  

  const handleAddComment = async () => {
    if (comment.trim() === '') {
      return;
    }




    try {
      const response = await fetch(`http://localhost:5000/add-comment/${imageId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (response.ok) {
        const updatedComments = await response.json();
        setComments(updatedComments);
        setComment('');
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  return (
    <div className="image-card">
      <img src={imageUrl} alt="uploaded" />
      <div>
        <button onClick={handleLike}>Like ({likes})</button>
        <button onClick={handleDislike}>Dislike ({dislikes})</button>
      </div>
      <div> 
        <input type="text" value={comment} onChange={handleCommentChange} placeholder="Add a comment" />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <div className="comments">
        {comments.map((c, index) => (
          <p key={index}>{c}</p>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;
