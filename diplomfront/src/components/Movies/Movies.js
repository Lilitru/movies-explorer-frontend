import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Burger from "../Burger/Burger";
import Preloader from "../Preloader/Preloader";

function Movies(props) {

  const ref = React.useRef();

  const [moviesToShow, setMoviesToShow] = React.useState(0);
  
  const allMoviesAdded = props.movies && moviesToShow === props.movies.length;

  const getNumberOfColumns = React.useCallback(() => {
    const columnsString = getComputedStyle(ref.current).getPropertyValue("grid-template-columns");
    if (!columnsString) 
      return;
    return columnsString.split(' ').length;
}, []);

React.useEffect(() => {
  function getInitialNumber() {
      const columnsCount = getNumberOfColumns();
      return columnsCount > 1 ? columnsCount * 4 : 5;
  }
  
  if (!props.movies || props.movies.length === 0) 
    return;
    
  if (allMoviesAdded) 
    setMoviesToShow(props.movies.length);
  else 
    setMoviesToShow(Math.min(getInitialNumber(), props.movies.length));
}, [props.movies, allMoviesAdded, getNumberOfColumns]);

  function loadMore() {
    if (moviesToShow === props.movies.length) 
      return;
      
    const moviesToAdd = getMoviesToAdd();
    setMoviesToShow(Math.min(moviesToShow + moviesToAdd, props.movies.length));
  }

  const getMoviesToAdd = () => Math.max(getNumberOfColumns(), 2);

  function SliceMovies(movies){
    if(movies)
      return movies.slice(0, moviesToShow);
    return movies;
  }

  return (
    <>
      <Burger />
      <section className="movies">
        <SearchForm saveFormState={true} checkShortMovies={props.checkShortMovies} searchQuery={props.query} isShortMovies={props.onlyShortMovies} onSearchMovies={props.onSearchMovies} onSearchQueryChanged={props.onSearchQueryChanged} />
        {props.showPreloader ? <Preloader /> : props.movies && props.movies.length === 0 && !props.moviesApiReturnError && <p className='movies__span'>Ничего не найдено</p>}
        {props.moviesApiReturnError && !props.showPreloader ? <p className='movies__span'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте еще раз.</p> :
          <>
            <MoviesCardList reference = {ref} movies={SliceMovies(props.movies)} savedMovies={props.savedMovies} saveMovie={props.saveMovie} />
            {props.movies && moviesToShow < props.movies.length && <button className='movies__btn' onClick={loadMore}>Ещё</button>}
          </>
        }
      </section>
    </>
  );
}

export default Movies;