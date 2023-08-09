import {HelmetProvider} from 'react-helmet-async';
import {Routes, Route} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';
import {DetailedOffer} from '../../types/offer-types';
import {Review} from '../../types/review-types';
import browserHistory from '../../browser-history';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoadingPage from '../../pages/loading-page/loading-page';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-router/history-router';

type AppProps = {
  detailedOffers: DetailedOffer[];
  reviews: Review[];
}

function App({detailedOffers, reviews}: AppProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const isDataLoading = useAppSelector((state) => state.loadingStatus);
  const isAuthorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (isAuthorizationStatus === AuthorizationStatus.Unknown || isDataLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainPage />
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage offers={offers} detailedOffers={detailedOffers} reviews={reviews}/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={isAuthorizationStatus}>
                <FavoritesPage offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
