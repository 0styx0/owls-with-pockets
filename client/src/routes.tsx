import React from 'react';
import { Route } from 'react-router';
import { HomeContainer } from './pages/HomeContainer';
import LoginContainer from './pages/LoginContainer';
import { GameContainer } from './pages/GameContainer';

export default (
    <Route path="/" component={HomeContainer}>
        <Route path="/login" component={LoginContainer} />
        <Route path="/game" component={GameContainer} />
    </Route>
);
