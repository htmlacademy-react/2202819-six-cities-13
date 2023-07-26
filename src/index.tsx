import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Settings} from './const';
import {city} from './mocks/city';
import {reviews} from './mocks/reviews';
import {offers, detailedOffers} from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount={Settings.OFFERS}
      city={city}
      offers={offers}
      detailedOffers={detailedOffers}
      reviews={reviews}
    />
  </React.StrictMode>
);
