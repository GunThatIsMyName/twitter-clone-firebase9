import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tweets from "../components/Tweets";
import { useAppContext } from "../context/AppContext";
import { dataBase } from "../firebase";

function Home() {
  const { user } = useAppContext();
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const collectionRef = collection(dataBase, "tweets");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collectionRef, {
      tweet,
      creatorId: user.id,
    });
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
        return newArr.push({ ...item.data(), id: item.id });
      });
      setTweets(newArr);
    });
  };

  useEffect(() => {
    getTweets();
    return () => getTweets();
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
        <button type="submit">submit</button>
      </form>

      {tweets.map((item) => {
        return <Tweets key={item.id} {...item} owner={user.id} />;
      })}
    </div>
  );
}

export default Home;
