import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Burger from "../Burger/Burger";

function SavedMovies() {
  return (
    <>
      <Burger />
      <section className="movies">
        <SearchForm />
        <MoviesCardList />
        {/* <Preloader /> */}
      </section>
    </>
  );
}

export default SavedMovies;