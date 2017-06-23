/**
 * Created by Galina on 23.06.2017.
 */
import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { createStore, renderDevTools } from '../utils/devTools';

import App from '../app';
import * as reducers from '../reducers';

import {addFilmId, addToLocalStorage, delFromLocalStorage} from '../actions/MoviesActions';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

store.dispatch(addFilmId(58));

store.dispatch(addToLocalStorage(395));

store.dispatch(delFromLocalStorage(0));


export default class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    {() => <App /> }
                </Provider>

                {renderDevTools(store)}
            </div>
        );
    }
}