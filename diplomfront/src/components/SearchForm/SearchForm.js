import React from 'react';
import search from '../../images/search__icon.svg';

function SearchForm() {

  return (
    <section className="search-form">
      <form className='search-form__container'>
        <div className='search-form__search'>
          <img className='search-form__img' src={search} alt='Лупа'></img>
          <input className='search-form__input' placeholder='Фильм'></input>
          <button className='search-form__btn'>Найти</button>
        </div>
        <div className='search-form__span'></div>
        <div className='search-form__filter'>
          <label className='search-form__check'>
            <input className='search-form__radio' type="radio"></input>
          </label>
          <p className='search-form__text'>Короткометражки</p>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;