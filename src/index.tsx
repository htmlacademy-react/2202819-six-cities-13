import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {city} from './mocks/city';
import {reviews} from './mocks/reviews';
import {detailedOffers} from './mocks/offers';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        city={city}
        detailedOffers={detailedOffers}
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>
);
