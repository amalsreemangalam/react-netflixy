import React, { useState } from "react";
import { createImageUrl } from "../Services/MovieServices";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../Services/firebase";
import { UserAuth } from "../context/AuthContext";

const MovieItem = ({ movie }) => {
  const [like, setLike] = useState(false);
  const { title, backdrop_path, poster_path } = movie;

  const { user } = UserAuth();

  const markFavShow = async () => {
  const userEmail = user?.email;

  if (userEmail) {
    const userDoc = doc(db, "users", userEmail); // Assuming "users" is your collection name
    setLike(!like);

    try {
      console.log("Updating document:", userDoc.path);
      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...movie }),
      });
      console.log("Movie added to favorites:", movie.title);
    } catch (error) {
      console.error("Error saving movie:", error);
      // Handle the error, such as displaying an error message to the user
    }
  } else {
    alert("Login to save movie.");
  }
};

  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
      <img
        className="w-full h-40 block object-cover object-top"
        src={createImageUrl(backdrop_path ?? poster_path, "w500")}
        alt={title}
      />
      <div className="absolute top-0 left-0 w-full h-40 bg-black/40 opacity-0 hover:opacity-70 text-white">
        <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
          {movie.title}
        </p>
        <p onClick={markFavShow} className="cursor-pointer">
          {like ? (
            <FaHeart
              size={20}
              className="absolute top-2 left-2 text-grey-300"
            />
          ) : (
            <FaRegHeart
              size={20}
              className="absolute top-2 left-2 text-grey-300"
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default MovieItem;