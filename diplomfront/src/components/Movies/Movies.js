import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
    return (
        <section className="movies">
          <SearchForm />
           <MoviesCardList />
           <button className='movies__btn'>Ещё</button>
          {/* <Preloader /> */}
        </section>
    );
}

export default Movies;