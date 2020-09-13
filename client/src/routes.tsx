import React from 'react';
import { Route } from 'react-router';
import { HomeContainer } from './pages/HomeContainer';
import LoginContainer from './pages/LoginContainer';
import Signup from './pages/Signup';
import { FeatureContainer } from './pages/FeatureContainer';
import { GameList } from './pages/GameList';


export default (
    <Route path="/" component={HomeContainer}>
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={Signup} />
        <Route path="/features" component={FeatureContainer} />
        <Route path="/game-list" component={GameList} />
    </Route>
);