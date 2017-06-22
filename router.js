/**
 * Created by Galina on 22.06.2017.
 */
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import MainLayout from './components/MainLayout';
import Home from './components/Home';


export default (
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="/" component={Home} />

        </Route>
    </Router>
);