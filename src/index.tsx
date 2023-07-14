import ReactDOM from 'react-dom/client';

import './i18n';
import './assets/css/app.css';
import './assets/css/tailwind.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import 'react-toastify/dist/ReactToastify.css';

import reportWebVitals from './reportWebVitals';
import Router from './router';

import { Provider } from 'react-redux';
import { store } from './store/index';
import App from './app';
import ReactGA from 'react-ga';

// Google Analytics
ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App>
      <Router />
    </App>
  </Provider>,
);

reportWebVitals();
