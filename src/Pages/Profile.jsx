import React, { useEffect, useState } from "react";

import { MdChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

import { UserAuth } from "../context/AuthContext";
import { db } from "../Services/firebase";
import { createImageUrl } from "../Services/MovieServices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
const Profile = () => {
  const [movies, setMovies] = useState([]);

  const { user } = UserAuth();
  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.exists()) setMovies(doc.data().favShows);
      });
    }
  }, [user?.email]);

  return <div>Profile</div>;
};

export default Profile;
