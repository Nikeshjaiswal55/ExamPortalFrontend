import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './auth';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/common.css';
import './styles/theme.css';
import { store } from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);
