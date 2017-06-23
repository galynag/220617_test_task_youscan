/**
 * Created by Galina on 22.06.2017.
 */
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Contacts from './components/Contacts';
import UserFavoriteList from './components/UserFavoriteList';
import MoviesItem from './components/MoviesItem';

export default (
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="/" component={Home} />
            <Route path="movie/:id" >
                <IndexRoute component={MoviesItem} />
            </Route>

            <Route path="favorite" >
                <IndexRoute component={UserFavoriteList} />
            </Route>
            <Route path="contacts" >
                <IndexRoute component={Contacts} />
            </Route>
        </Route>
    </Router>
);