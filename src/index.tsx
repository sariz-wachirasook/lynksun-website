import React from 'react';
import ReactDOM from 'react-dom/client';

import './i18n';
import './assets/css/app.css';
import './assets/css/tailwind.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';

import reportWebVitals from './reportWebVitals';
import Router from './router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Router />);

const jsDefaultLayout = document.querySelector('.js-default-layout');
const jsAppLayout = document.querySelector('.js-app-layout');

if (jsDefaultLayout) {
  console.log('default layout');
}
reportWebVitals();
