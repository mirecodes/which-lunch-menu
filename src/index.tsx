import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Create Store
const store = configureStore({
	reducer: rootReducer,
	middleware: [logger, thunk],
});

// Render Using Provider Component
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
