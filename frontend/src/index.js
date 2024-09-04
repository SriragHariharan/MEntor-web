import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux toolkit/store';
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import swDev from './sw-dev'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
		<Provider store={store}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Provider>
	</PayPalScriptProvider>
);

swDev();