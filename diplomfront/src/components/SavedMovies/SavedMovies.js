import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Burger from "../Burger/Burger";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  return (
    <>
      <Burger />
      <section className="movies">
        <SearchForm checkShortMovies={props.checkShortMovies} searchQuery={props.query} isShortMovies={props.onlyShortMovies} onSearchMovies={props.onSearchMovies} onSearchQueryChanged={props.onSearchQueryChanged} />
        {props.showPreloader ? <Preloader /> : props.movies !== undefined && props.movies.length === 0 && <p className='movies__span'>Ничего не найдено</p>}
        {
          props.moviesApiReturnError ? <p className='movies__span'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте еще раз.</p> :
            <>
              <MoviesCardList movies={props.savedMovies} savedMovies={props.savedMovies} saveMovie={props.removeMovieFromSaved} />
            </>
        }
      </section>
    </>
  );
}

export default SavedMovies;