import React from 'react';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './store';
import Routes from './routes';

import GlobalStyled from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyled />
      <Routes />
      <ToastContainer
        autoClose={8000}
        closeButton={false}
        pauseOnHover
        position="bottom-right"
      />
    </Provider>
  );
}

export default App;
