import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

const siteTitle = 'DX Team Jira Dashboard';

ReactDOM.render( <App title={ siteTitle } />, document.getElementById('root') );

serviceWorker.register();
