class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        authorization: this.getToken()
      }
    })
      .then(this._checkResponse);
  }

  createMovie(country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: { ...this._headers, authorization: this.getToken() },
      body: JSON.stringify({
        country, director, duration, year, description, image,
        trailerLink, thumbnail, movieId, nameRU, nameEN
      })
    })
      .then(this._checkResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: { authorization: this.getToken() },
    })
      .then(this._checkResponse);
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
      .then(this._checkResponse);
  }

  signUp(name, password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, password, email })
    })
      .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this.getToken()
      }
    })
      .then(this._checkResponse);
  }

  updateUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: { ...this._headers, authorization: this.getToken() },
      body: JSON.stringify({ name, email })
    })
      .then(this._checkResponse);
  }

  getToken() {
    return `Bearer ${localStorage.getItem('token')}`
  }
}


const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;