import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Error from '../Error/Error';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

function App() {

  const history = useHistory();

  let [loggedIn, setLoggedIn] = React.useState(null);

  let [preloaderOn, setPreloaderOn] = React.useState(false);

  let [moviesSearchQuery, setMoviesSearchQuery] = React.useState('');

  let [onlyShortMovies, setOnlyShortMovies] = React.useState(false);

  let [moviesCollection, setMoviesCollection] = React.useState(Array[0]);

  let [regFailedError, setRegFailedError] = React.useState(null);

  let [currentUser, setCurrentUser] = React.useState({});

  let [moviesApiReturnError, setMoviesApiReturnError] = React.useState(false);

  let [filteredMoviesCollection, setFilteredMoviesCollection] = React.useState(Array[0]);

  let [savedUserMovies, setSavedUserMovies] = React.useState(Array[0]);

  function handleRegisterUser(name, password, email) {
    mainApi.signUp(name, password, email).then((signUpUser) => {
      if (signUpUser) {
        handleLoginUser(email, password);
      }
    })
      .catch(err => {
        setRegFailedError(err);
        console.log(err);
      });
  }

  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      // здесь будем проверять токен
      mainApi.getUserInfo(token)
        .then((userCheck) => {
          setLoggedIn(true);
          setCurrentUser(userCheck);
          localStorage.setItem("user", JSON.stringify(userCheck));
        })
        .catch(err => {
          console.log(err); // выведем ошибку в консоль
          localStorage.removeItem('token');
        });
    }
    else {
      setLoggedIn(false);
    }
  }

  React.useEffect(() => {
    checkToken();
    //setPermissonCheck(true);
    //    setCheckedFilms(JSON.parse(localStorage.getItem("checkedFilms")));
    //    setCheckedSaveFilms(JSON.parse(localStorage.getItem("checkedSaveFilms")));
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      if (loggedIn) {
        Promise.all([
          mainApi.getUserInfo(),
          mainApi.getMovies(),
        ])
          .then(([user, saveMovies]) => {
            localStorage.setItem("user", JSON.stringify(user));
            setCurrentUser(user);
            const savedMovies = saveMovies.filter((movie) => movie.owner === user._id);
            setSavedUserMovies(savedMovies ?? Array[0]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 1000);
  }, [loggedIn]);

  React.useEffect(() => {
    setMoviesSearchQuery(localStorage.getItem("moviesSearchQuery"));
    const onlyShort = JSON.parse(localStorage.getItem("onlyShortMovies"));
    setOnlyShortMovies(onlyShort ?? false);
    const moviesCollectionLocalStorage = JSON.parse(localStorage.getItem("moviesCollection"));
    setMoviesCollection(moviesCollectionLocalStorage ?? Array[0]);


    const filteredMoviesCollectionLocalStorage = JSON.parse(localStorage.getItem("filteredMoviesCollection"));
    setFilteredMoviesCollection(filteredMoviesCollectionLocalStorage ?? Array[0]);
  }, []);

  // Обновление короткометражек
  React.useEffect(() => {
    //setShortMovies(JSON.parse(localStorage.getItem("durationMovieShort")));
    // setShortMoviesSave(
    //   JSON.parse(localStorage.getItem("durationMovieShortSave"))
    // );
  }, []);

  function handleLoginUser(email, password) {
    mainApi.signIn(email, password).then((signInUser) => {
      if (signInUser) {
        localStorage.setItem('token', signInUser.token);
      }
    })
      .then(() => {
        checkToken();
        history.push('/movies');
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSearchMovies(searchQuery, isShortMovies) {

    setPreloaderOn(true);

    moviesApi.getMovies().then((movies) => {
      setMoviesCollection(movies);
      localStorage.setItem("moviesCollection", JSON.stringify(movies));

      const moviesFilter = filterMovies(movies, searchQuery, isShortMovies);

      setFilteredMoviesCollection(moviesFilter);
      localStorage.setItem("filteredMoviesCollection", JSON.stringify(moviesFilter));
      setMoviesApiReturnError(false);
    })
      .catch(err => {
        console.log(err);
        setMoviesApiReturnError(true);
      })
      .finally(() => {
        setPreloaderOn(false);
      });
  }

  function filterMovies(movies, searchQuery, isShortMovies) {
    return movies
      ? movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
          && checkMoviesLength(movie, isShortMovies);
      })
      : Array[0];
  }

  function checkMoviesLength(movie, needShortOnly) {
    if (!needShortOnly)
      return true;
    return movie.duration <= 40;
  }

  function checkShortMovies(e) {
    setOnlyShortMovies(e.target.checked);
    localStorage.setItem("onlyShortMovies", e.target.checked);

    const moviesFilter = filterMovies(moviesCollection, moviesSearchQuery, e.target.checked);
    setFilteredMoviesCollection(moviesFilter);
    localStorage.setItem("filteredMoviesCollection", JSON.stringify(moviesFilter));

  }

  function handleSearchQueryChanged(query) {
    setMoviesSearchQuery(query);
    localStorage.setItem("moviesSearchQuery", query);
  }

  function handleUpdateUserInfo(name, email) {
    mainApi.updateUserInfo(name, email)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSignOut() {
    if (loggedIn) {
      setLoggedIn(false);
      localStorage.removeItem('token');
      setCurrentUser({});
      history.push('/signin');
    }
  }

  function handleSaveMovie(card, isSaved) {

    if (isSaved) {
      const movieToDelete = savedUserMovies.find((movie) => movie.movieId === card.id);

      mainApi.deleteMovie(movieToDelete._id)
        .then((movie) => {
          const newSavedMovies = savedUserMovies.filter((item) => item._id !== movie._id);
          setSavedUserMovies(newSavedMovies);
        })
        .catch(err => {
          console.log(err);
        });
    }
    else {
      mainApi.createMovie(
        card.country,
        card.director,
        card.duration,
        card.year,
        card.description,
        `${moviesApi.getImagesBaseUrl()}${card.image.url}`,
        card.trailerLink,
        `${moviesApi.getImagesBaseUrl()}${card.image.formats.thumbnail.url}`,
        card.id,
        card.nameRU,
        card.nameEN
      ).then((movie) => {
        setSavedUserMovies([...savedUserMovies, movie]);
      })
        .catch(err => {
          console.log(err);
        });;
    }
  }

  if (loggedIn === null)
    return null;

  return (
    <UserContext.Provider value={currentUser}>
      <div className="app">
        <Header isLoggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Main isLoggedIn={loggedIn} />
          </Route>
          <ProtectedRoute path="/movies"
            loggedIn={loggedIn}
            checkShortMovies={checkShortMovies}
            onSearchQueryChanged={handleSearchQueryChanged}
            query={moviesSearchQuery}
            onlyShortMovies={onlyShortMovies}
            movies={filteredMoviesCollection}
            savedMovies={savedUserMovies}
            showPreloader={preloaderOn}
            onSearchMovies={handleSearchMovies}
            saveMovie={handleSaveMovie}
            moviesApiReturnError={moviesApiReturnError}
            component={Movies}>
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies"
            loggedIn={loggedIn}
            movies={filteredMoviesCollection}
            savedMovies={savedUserMovies}
            saveMovie={handleSaveMovie}
            component={SavedMovies}>
          </ProtectedRoute>
          <ProtectedRoute path="/profile" loggedIn={loggedIn} updateUserInfo={handleUpdateUserInfo} onSignOut={handleSignOut} component={Profile}>
          </ProtectedRoute>
          <Route path="/signup">
            <Register isLoggedIn={loggedIn} onRegisterUser={handleRegisterUser} registrationError={regFailedError} />
          </Route>
          <Route path="/signin">
            <Login isLoggedIn={loggedIn} onLoginUser={handleLoginUser} />
          </Route>
          <Route path="/*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
