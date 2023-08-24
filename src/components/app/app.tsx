import {HelmetProvider} from 'react-helmet-async';
import {Routes, Route} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {AppRoute} from '../../const';
import {getAuthorizationStatus} from '../../store/user-data/user-data.selectors';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage/>}
          />
          <Route path={AppRoute.Offer}>
            <Route
              path=':id'
              element={<OfferPage/>}
            />
          </Route>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={isAuthorizationStatus}>
                <FavoritesPage/>
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<NotFoundPage/>}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
