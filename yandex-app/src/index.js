import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import routes from './client/routes';


ReactDOM.render(
    <div className="app-router">
        <Router history={createBrowserHistory()}>
            {routes}
        </Router>
    </div>,
    document.getElementById('root')
);