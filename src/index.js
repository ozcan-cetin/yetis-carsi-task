import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalContextProvider } from './GlobalContext/GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <GlobalContextProvider>
    <App />
       </GlobalContextProvider>
  </React.StrictMode>
);
