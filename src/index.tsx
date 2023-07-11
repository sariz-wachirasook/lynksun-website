import React from 'react';
import ReactDOM from 'react-dom/client';

import './i18n';
import './assets/css/app.css';
import './assets/css/tailwind.css';
import 'flowbite/dist/flowbite.min.js';

import reportWebVitals from './reportWebVitals';
import Router from './router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);

reportWebVitals();
