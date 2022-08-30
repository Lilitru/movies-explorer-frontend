import React from 'react';
import search from '../../images/search__icon.svg';
import MovieFilter from '../MovieFilter/MovieFilter';

function SearchForm(props) {

  const [searchQueryString, setSearchQueryString] = React.useState('');

  const [shortMoviesOnly, setShortMoviesOnly] = React.useState(false);

  const [filmQueryIsValid, setFilmQueryIsValid] = React.useState(true);

  const filmValidationClass = filmQueryIsValid === false ? 'film__error-active' : 'film__error';

  React.useEffect(() => {
    setSearchQueryString(props.searchQuery);
    setShortMoviesOnly(props.isShortMovies);
  }, [props.searchQuery, props.isShortMovies]);


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    
    if (!searchQueryString || searchQueryString.length === 0)
    {
      setFilmQueryIsValid(false);
      return;
    }
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onSearchMovies(searchQueryString, shortMoviesOnly);
  }

  function handleChangeQuery(e) {

    if (!e.target.value || e.target.value.length === 0) {
      setFilmQueryIsValid(false);
    } else {
      setFilmQueryIsValid(true);
    }
      setSearchQueryString(e.target.value);
      props.onSearchQueryChanged(e.target.value);
  }

    return (
      <section className="search-form">
        <form className='search-form__container' noValidate onSubmit={handleSubmit}>
          <div className='search-form__search'>
            <img className='search-form__img' src={search} alt='Лупа'></img>
            <input id="film" className='search-form__input' required placeholder='Фильм' value={searchQueryString || ''} onChange={handleChangeQuery}></input>
            <span id="film-error" className={filmValidationClass}>Нужно ввести ключевое слово</span>
            <button className='search-form__btn' type='submit'>Найти</button>
          </div>
          <div className='search-form__span'></div>
          <MovieFilter checkShort={props.checkShortMovies} onChecked={shortMoviesOnly} />
        </form>
      </section>
    )
  }

  export default SearchForm;