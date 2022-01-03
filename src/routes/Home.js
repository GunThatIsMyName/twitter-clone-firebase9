import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dataBase } from "../firebase";

function Home() {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const collectionRef = collection(dataBase, "tweets");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hello = await addDoc(collectionRef, {
      tweet,
    });
    console.log(hello, "tweet");
    setTweet("");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setTweet(value);
  };

  const getTweets = () => {
    onSnapshot(collectionRef, (snapshot) => {
      let newArr = [];
      snapshot.docs.map((item) => {
        return newArr.push({ ...item.data() });
      });
      setTweets(newArr);
    });
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          onChange={handleChange}
          value={tweet}
          type="text"
          placeholder={`Whats'up`}
        />
        <button type="submit">Tweet</button>
      </form>

      <div>
        {tweets.map((item) => {
          return <p>{item.tweet}</p>;
        })}
      </div>
    </div>
  );
}

export default Home;
