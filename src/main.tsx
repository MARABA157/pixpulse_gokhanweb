import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import reportWebVitals from './utils/analytics';
import { initSentry } from './utils/sentry';
import './index.css';

// Sentry'yi başlat
if (import.meta.env.VITE_ENABLE_SENTRY === 'true') {
  initSentry();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// Performance metrikleri
reportWebVitals();
