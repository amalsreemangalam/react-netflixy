import React from "react";
import Hero from "../Components/Hero";
import MovieRow from "../Components/MovieRow";
import endpoints from "../Services/MovieServices";

const Home = () => {
  return (
    <>
      <Hero />
      {/* <MovieRow  title='upcoming' url={endpoints.upcoming}/> */}
      <MovieRow title='trending' url={endpoints.trending}/>
      <MovieRow title='topRated' url={endpoints.topRated}/>
      <MovieRow title='comedy' url={endpoints.comedy}/>
      <MovieRow title='popular' url={endpoints.popular}/>
      
    </>
  );
};

export default Home;
