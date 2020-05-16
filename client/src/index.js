import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import Main from './Main/index';
import history from "./history";

ReactDOM.render(
    <Router history={history}>
        <Main history={history} />
    </Router>,
  document.getElementById('root')
);
