import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './utilities/store';
import App from './app/App';
import './style/index.css';
import './style/webkitStyling.css';

const container = document.getElementById('root');
const root = createRoot(container);

// Render the application on the root of the index.html file
root.render(
  <React.StrictMode>

    {/* Establish a redux store for the application */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


