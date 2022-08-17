import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
    return (
        <section className="movies">
          <SearchForm />
           <MoviesCardList />
          {/* <Preloader /> */}
        </section>
    );
}

export default SavedMovies;