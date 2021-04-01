/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-alert */
/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import * as serviceWorker from "./serviceWorker";
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import { ToastContainer, Slide } from 'react-toastify';
import * as serviceWorker from './serviceWorker';
import store from './store';
// import favicon from './assets/img/favicon.jpg';
import Main from './Main';
import Loader from './component/Loader.jsx';
import { cognito } from './helper/config';
import 'react-toastify/dist/ReactToastify.css';

Amplify.configure({
  Auth: {
    userPoolId: cognito.POOL_ID,
    region: cognito.REGION,
    userPoolWebClientId: cognito.CLIENT_ID,
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    console.log('refresh');
    const oldJwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  });

  let loader = <Loader />;
  if (loading == false) {
    loader = (
      <div>
        <Provider store={store}>
          <Router>
            <ToastContainer
              position="top-center"
              transition={Slide}
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              className="custom-toast"
            />
            <Main />
          </Router>
        </Provider>
      </div>
    );
  }
  return loader;
};

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
