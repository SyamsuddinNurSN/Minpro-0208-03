import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import './global.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// import '@fontsource-variable/open-sans/wdth.css';
import '@fontsource-variable/montserrat';
import theme from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ToastContainer />
      <App />
    </ChakraProvider>
  </Provider>
);
