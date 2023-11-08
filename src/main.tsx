import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';

import App from './App.tsx';
import store from './store/index.ts';

import './index.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primeflex/primeflex.css'; // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </PrimeReactProvider>,
);
