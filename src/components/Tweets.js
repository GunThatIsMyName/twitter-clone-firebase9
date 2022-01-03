import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dataBase } from "../firebase";

function Tweets({ id, tweet, creatorId, owner }) {
  const [isEditMode, setEditMode] = useState(false);
  const [newTweet, setTweet] = useState(tweet);

  const handleDelte = async (e) => {
    const { id } = e.target.dataset;
    const docRef = doc(dataBase, "tweets", id);
    await deleteDoc(docRef);
  };

  const handleEdit = () => {
    setEditMode((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = doc(dataBase, "tweets", id);
    await updateDoc(docRef, {
      tweet: newTweet,
    });

    handleEdit();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setTweet(value);
  };

  return (
    <div key={id}>
      <h4>{tweet}</h4>
      {isEditMode && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            id="text"
            onChange={handleChange}
            placeholder="Edit Tweeter"
            value={newTweet}
          />
          <button type="submit">Edit</button>
        </form>
      )}
      {owner === creatorId && (
        <>
          <button data-id={id} onClick={isEditMode ? handleEdit : handleDelte}>
            {isEditMode ? "cancel" : "Delete Button"}
          </button>
          {!isEditMode && <button onClick={handleEdit}>Edit button</button>}
        </>
      )}
    </div>
  );
}

export default Tweets;
