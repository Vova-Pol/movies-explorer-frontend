import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <BrowserRouter basename="/movies-explorer-frontend">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
);
