import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tweets from "../components/Tweets";
import { useAppContext } from "../context/AppContext";
import { dataBase, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Home() {
  const { user } = useAppContext();
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const [image, setImage] = useState("");
  const [previews, setPrevies] = useState("");

  const collectionRef = collection(dataBase, "tweets");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return;
    let newImages = [];
    image.map((item,idx)=>{
      const storageRef = ref(storage, `/files/${item.name}`);
      const uploadTask = uploadBytesResumable(storageRef, item);
      return uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred/ snapshot.totalBytes)*100
          )
          console.log(progress,"progress");
        },
        () => console.log("ERROR"),
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          newImages.push(imageUrl);

          
          if(idx===1){
            console.log(newImages,"new image");
            await addDoc(collectionRef, {
              tweet,
              creatorId: user.id,
              imageUrl:newImages
            });
            setTweet("");
          }
        }
      );
    })

    // hello world
    console.log("hit the end@");
  };

  const sayHello = ()=>{
    console.log("HELLO")
  }

  const handleImageFile = (e) => {
    const { files } = e.target;
    const theFiles = files;
    let arr = [];
    const newArr = Array.from(theFiles).map((item) => {
      arr.push(item);
      return URL.createObjectURL(item);
    });
    setImage(arr);
    setPrevies(newArr);
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

  console.log(image, "img");

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          onChange={handleChange}
          value={tweet}
          type="text"
          required
          placeholder={`Whats'up`}
        />

        <input
          onChange={handleImageFile}
          type="file"
          name="file"
          multiple
          required
          accept="image/*"
          id="file"
        />
        {previews.length >= 1 &&
          previews.map((item, idx) => {
            return (
              <img key={idx} src={item} alt={idx} width={100} height={100} />
            );
          })}

        <button type="submit">submit</button>
      </form>

      {tweets.map((item) => {
        return <Tweets key={item.id} {...item} owner={user.id} />;
      })}
    </div>
  );
}

export default Home;
