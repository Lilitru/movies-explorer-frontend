import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Burger from "../Burger/Burger";
import Preloader from "../Preloader/Preloader";

function Movies(props) {


  const windowSizeMax = window.innerWidth >= 1280 && 12;
  const windowSizeMiddle =
    window.innerWidth <= 1280 && window.innerWidth >= 769 && 12;
  const windowSizeMiddleAndMin =
    window.innerWidth <= 768 && window.innerWidth >= 481 && 8;
  const windowSizeMin = window.innerWidth <= 480 && 5;
  const condition =
    windowSizeMax ||
    windowSizeMiddle ||
    windowSizeMiddleAndMin ||
    windowSizeMin;

  const [countMovies, setCountMovies] = React.useState(condition);

  function loadMore() {
    if (window.innerWidth >= 1280) {
      setCountMovies(countMovies + 3);
    } else if (window.innerWidth <= 1280 && window.innerWidth >= 769) {
      setCountMovies(countMovies + 3);
    } else if (window.innerWidth <= 768 && window.innerWidth >= 481) {
      setCountMovies(countMovies + 2);
    } else {
      setCountMovies(countMovies + 2);
    }
  }

  function SliceMovies(movies){
    if(movies)
      return movies.slice(0, countMovies);
    return movies;
  }

  return (
    <>
      <Burger />
      <section className="movies">
        <SearchForm checkShortMovies={props.checkShortMovies} searchQuery={props.query} isShortMovies={props.onlyShortMovies} onSearchMovies={props.onSearchMovies} onSearchQueryChanged={props.onSearchQueryChanged} />
        {props.showPreloader ? <Preloader /> : props.movies && props.movies.length === 0 && !props.moviesApiReturnError && <p className='movies__span'>Ничего не найдено</p>}
        {props.moviesApiReturnError && !props.showPreloader ? <p className='movies__span'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте еще раз.</p> :
          <>
            <MoviesCardList movies={SliceMovies(props.movies)} savedMovies={props.savedMovies} saveMovie={props.saveMovie} />
            {props.movies && countMovies < props.movies.length && <button className='movies__btn' onClick={loadMore}>Ещё</button>}
          </>
        }
      </section>
    </>
  );
}

export default Movies;