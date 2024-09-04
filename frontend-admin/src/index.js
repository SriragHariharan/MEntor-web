import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SignupProvider } from './contexts/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SignupProvider>
        <App />
    </SignupProvider>
  </React.StrictMode>
);
