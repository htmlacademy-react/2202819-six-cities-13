import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {City, Offer, DetailedOffer} from '../../types/offer-types';
import {Review} from '../../types/review-types';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offersCount: number;
  city: City;
  offers: Offer[];
  detailedOffers: DetailedOffer[];
  reviews: Review[];
}

function App({offersCount, city, offers, detailedOffers, reviews}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainPage
                offersCount={offersCount}
                city={city}
                offers={offers}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage city={city} offers={offers} detailedOffers={detailedOffers} reviews={reviews}/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesPage offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
