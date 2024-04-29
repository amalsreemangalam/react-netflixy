import axios from "axios";

import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MovieRow = ({ title, url }) => {

const rowId=Math.floor(Math.random()*1000)

  const [Movies, setMovies] = useState([]);

  //   useEffect(() => {
  //     async function getMovies() {
  //       const movies = await axios.get(url);
  //       console.log(movies);
  //       setMovies(movies.data.results);
  //     }
  //     getMovies();
  //     // axios.get(url).then((response) => setMovies(response.data.results));
  //   }, [url]);

  useEffect(() => {
    axios.get(url).then((response) => setMovies(response.data.results));
  }, [url]);

  const slide = (offset) => {
    const slider = document.getElementById("slider"+rowId);
    slider.scrollLeft = slider.scrollLeft+offset; // Use += to add the offset to the current scroll position
  };

  return (
    <>
      <h2 className="text-white font-nsans-bold md:text-xl p-4 capitalize">
        {title}
      </h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide(-500)} // Scroll left
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />

        <div
          id={"slider"+rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {Movies.map((movie, index) => (
            //   <h1 key={index} className="text-white">{movie.title}</h1>
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)} // Scroll right
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
      </div>
    </>
  );
};

export default MovieRow;
