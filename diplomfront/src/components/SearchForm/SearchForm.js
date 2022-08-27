import React from 'react';
import search from '../../images/search__icon.svg';
import MovieFilter from '../MovieFilter/MovieFilter';

function SearchForm(props) {

  const [searchQueryString, setSearchQueryString] = React.useState('');
  
  const [shortMoviesOnly, setShortMoviesOnly] = React.useState(false);

  React.useEffect(() => {
    setSearchQueryString(props.searchQuery);
    setShortMoviesOnly(props.isShortMovies);
  }, [props.searchQuery, props.isShortMovies]);


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onSearchMovies(searchQueryString, shortMoviesOnly);
  }

  function handleChangeQuery(e){
    setSearchQueryString(e.target.value);
    props.onSearchQueryChanged(e.target.value);
  }

  return (
    <section className="search-form">
      <form className='search-form__container' onSubmit={handleSubmit}>
        <div className='search-form__search'>
          <img className='search-form__img' src={search} alt='Лупа'></img>
          <input id="film" className='search-form__input' required placeholder='Фильм' value={searchQueryString || ''} onChange={handleChangeQuery} minLength="1"></input>
          <button className='search-form__btn' type='submit'>Найти</button>
        </div>
        <div className='search-form__span'></div>
        <MovieFilter checkShort={props.checkShortMovies}  onChecked={shortMoviesOnly}/>
      </form>
    </section>
  )
}

export default SearchForm;