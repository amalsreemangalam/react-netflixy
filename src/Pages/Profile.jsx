import React, { useEffect, useState } from "react";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";

import { db } from "../Services/firebase";
import { createImageUrl } from "../Services/MovieServices";

import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

function Profile() {
  const [movies, setMovie] = useState([]);

  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setMovie(doc.data().favShows);
      });
    }
  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + offset; // Use += to add the offset to the current scroll position
  };

  const handleUnlikeShow = async (movie) => {
    const UserDoc = doc(db, "users", user.email);

    console.log(UserDoc);

    await updateDoc(UserDoc, {
      favShows: arrayRemove(movie),
    });
  };

  if (!user) {
    return (
      <>
        <p>fetching shows...</p>
      </>
    );
  }

  return (
    <>
      <div>
        <div>
          <img
            className="bloc w-full h-[500px] object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/9f46b569-aff7-4975-9b8e-3212e4637f16/453ba2a1-6138-4e3c-9a06-b66f9a2832e4/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="//"
          />

          <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]" />
          <div className="absolute top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-nsans-bold my-2">
              Myyy Shows
            </h1>
            <p className="font-nsans-light text-gray-400 text-lg">
              {user.email}
            </p>
          </div>
        </div>

        {/* movie row */}

        <h2 className="text-white font-nsans-bold md:text-xl p-4 capitalize">
          Fav Shows
        </h2>
        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={() => slide(-500)} // Scroll left
            className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
          />

          <div
            id={"slider"}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {movies.map((movie) => (
              //   <h1 key={idex} className="text-white">{movie.title}</h1>

              <div
                key={movie.id}
                className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
              >
                <img
                  className="w-full h-40 block object-cover object-top"
                  src={createImageUrl(
                    movie.backdrop_path ?? movie.poster_path,
                    "w500"
                  )}
                  alt={movie.title}
                />
                <div className="absolute top-0 left-0 w-full h-40 bg-black/40 opacity-0 hover:opacity-70 text-white">
                  <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                    {movie.title}
                  </p>

                  <p>
                    <AiOutlineClose
                      size={30}
                      onClick={() => handleUnlikeShow(movie)}
                      className="absolute top-2 right-2"
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <MdChevronRight
            onClick={() => slide(500)} // Scroll right
            className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
          />
        </div>
      </div>
    </>
  );
}

export default Profile;
