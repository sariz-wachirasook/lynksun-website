import ReactDOM from 'react-dom/client';

import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/app.css';
import './assets/css/tailwind.css';
import './i18n';

import reportWebVitals from './reportWebVitals';
import Router from './router';

import { Provider } from 'react-redux';
import App from './app';
import { store } from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App>
      <Router />
    </App>
  </Provider>,
);

reportWebVitals();
