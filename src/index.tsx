import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {reviews} from './mocks/reviews';
import {detailedOffers} from './mocks/offers';
import {store} from './store';
import {fetchOffersAction, checkAuthAction} from './store/api-actions';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        detailedOffers={detailedOffers}
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>
);
