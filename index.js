import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import MainLayout from './components/MainLayout';



render (
    <MainLayout />,
    document.getElementById('root')
);
