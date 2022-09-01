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
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {

  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(null);

  const [preloaderOn, setPreloaderOn] = React.useState(false);

  const [moviesCollection, setMoviesCollection] = React.useState(Array[0]);

  const [regFailedError, setRegFailedError] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  const [moviesApiReturnError, setMoviesApiReturnError] = React.useState(false);

  const [filteredMoviesCollection, setFilteredMoviesCollection] = React.useState(Array[0]);

  const [savedUserMovies, setSavedUserMovies] = React.useState(Array[0]);

  const [savedAndFilteredUserMovies, setSavedAndFilteredUserMovies] = React.useState(Array[0]);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [infoToolTipOk, setInfoToolTipOk] = React.useState(false);

  function handleRegisterUser(name, password, email) {
    mainApi.signUp(name, password, email).then((signUpUser) => {
      if (signUpUser) {
        handleLoginUser(email, password);
      }
      else{
        showInfoTooltipFail();
      }
    })
      .catch(err => {
        setRegFailedError('Что то пошло не так');
        console.log(err);
      });
  }

  function checkToken(redirectToMovies) {
    const token = localStorage.getItem('token');
    if (token) {
      // здесь будем проверять токен
      mainApi.getUserInfo()
        .then((userCheck) => {
          if (!userCheck)
          {
            localStorage.removeItem('token');
            history.push('/signin');
          }
          else {
            setLoggedIn(true);
            setCurrentUser(userCheck);
            localStorage.setItem("user", JSON.stringify(userCheck));
          }
        })
        .then(() => {
          if (redirectToMovies)
            history.push('/movies');
        })
        .catch(err => {
          console.log(err); // выведем ошибку в консоль
          localStorage.removeItem('token');
          history.push('/signin');
        });
    }
    else {
      setLoggedIn(false);
    }
  }

  React.useEffect(() => {
    checkToken(false);
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
            setSavedAndFilteredUserMovies(savedMovies ?? Array[0]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 1000);
  }, [loggedIn]);

  React.useEffect(() => {
    const mc = JSON.parse(localStorage.getItem("moviesCollection"));
    if(mc)
      setMoviesCollection(mc);
    const filteredMoviesCollectionLocalStorage = JSON.parse(localStorage.getItem("filteredMoviesCollection"));
    setFilteredMoviesCollection(filteredMoviesCollectionLocalStorage ?? Array[0]);
  }, []);

  function handleLoginUser(email, password) {
    mainApi.signIn(email, password).then((signInUser) => {
      if (signInUser) {
        localStorage.setItem('token', signInUser.token);
      }
      else{
        showInfoTooltipFail();
      }
    })
      .then(() => {
        checkToken(true);
      })
      .catch(err => {
        showInfoTooltipFail();
        console.log(err);
      });
  }

  function handleSearchMovies(searchQuery, isShortMovies) {

    setPreloaderOn(true);

    if (moviesCollection && moviesCollection.length > 0) {

      setPreloaderOn(false);
      const moviesFilter = filterMovies(moviesCollection, searchQuery, isShortMovies);

      setFilteredMoviesCollection(moviesFilter);
      localStorage.setItem("filteredMoviesCollection", JSON.stringify(moviesFilter));
      setMoviesApiReturnError(false);

    }
    else {
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
  }

  function handleSearchMoviesForSavedMovies(searchQuery, isShortMovies) {

    setPreloaderOn(true);
    const moviesFilter = filterMovies(savedUserMovies, searchQuery, isShortMovies);
    setSavedAndFilteredUserMovies(moviesFilter);

    setMoviesApiReturnError(false);
    setPreloaderOn(false);
  }

  function filterMovies(movies, searchQuery, isShortMovies) {

    return movies
      ? movies.filter((movie) => {
        return searchQuery ? movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
          && checkMoviesLength(movie, isShortMovies) : checkMoviesLength(movie, isShortMovies);
      })
      : Array[0];
  }

  function checkMoviesLength(movie, needShortOnly) {
    if (!needShortOnly)
      return true;
    return movie.duration <= 40;
  }

  function handleUpdateUserInfo(name, email) {
    mainApi.updateUserInfo(name, email)
      .then((user) => {
        setCurrentUser(user);
        showInfoTooltipOk();
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
      history.push('/');
    }
  }

  function handleSaveMovie(card, isSaved) {

    if (isSaved) {
      const movieToDelete = savedUserMovies.find((movie) => movie.movieId === card.id);
      handleRemoveMovieFromSaved(movieToDelete);
    }
    else {
      mainApi.createMovie(
        card.country || '  ',
        card.director || '  ',
        card.duration || 0,
        card.year || '  ',
        card.description || '',
        `${moviesApi.getImagesBaseUrl()}${card.image.url}`,
        card.trailerLink,
        `${moviesApi.getImagesBaseUrl()}${card.image.formats.thumbnail.url}`,
        card.id,
        card.nameRU || '  ',
        card.nameEN || '  '
      ).then((movie) => {
        setSavedUserMovies([...savedUserMovies, movie]);
      })
        .catch(err => {
          console.log(err);
        });;
    }
  }

  function handleRemoveMovieFromSaved(card) {

    mainApi.deleteMovie(card._id)
      .then((movie) => {
        const newSavedMovies = savedUserMovies.filter((item) => item._id !== movie._id);
        setSavedUserMovies(newSavedMovies);
        const newFilteredMovies = savedAndFilteredUserMovies.filter((item) => item._id !== movie._id);
        setSavedAndFilteredUserMovies(newFilteredMovies);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function closeTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function showInfoTooltipOk() {
    setInfoToolTipOk(true);
    setIsInfoTooltipOpen(true);
  }

  function showInfoTooltipFail() {
    setInfoToolTipOk(false);
    setIsInfoTooltipOpen(true);
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
            showPreloader={preloaderOn}
            onSearchMovies={handleSearchMoviesForSavedMovies}
            moviesApiReturnError={moviesApiReturnError}
            savedMovies={savedAndFilteredUserMovies}
            removeMovieFromSaved={handleRemoveMovieFromSaved}
            saveFormState={false}
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
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeTooltip}
          ok={infoToolTipOk} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
