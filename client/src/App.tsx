import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import LoginContainer from './pages/LoginContainer';
import { FeatureContainer } from './pages/FeatureContainer';
import { GameList } from './pages/GameList';
import WSComponent from './pages/WSComponent'
import { GameContainer } from './pages/GameContainer';
// import Header from './pages/Header';
import Signup from './pages/Signup';
import "./pages/style.css";

function App() {
  return (
    <div>
      <Router>
          <div className="menu-container">
            <h1>GamePocket</h1>
            <p id="heading">Enjoy some classic board games! How high will you rank?</p>

            <nav className="menu-bar">
              <Link to="/features"><input type="button" className="button" value="Featured Games" /></Link>
              <Link to="/game-list"><input type="button" className="button" value="All Games" /></Link>
              <input type="button" className="button" value="Leaderboard" />
              <input type="button" className="button" value="Create Game" />
              <input type="button" className="button" value="My Profile" / >
              <Link to="/signup"><input type="button" className="button" value="Sign Up" /></Link>
              <Link to="/login"><input type="button" className="button" value="Log In" /></Link>
              <Link to="/game"><input type="button" className="button" value="Play" /></Link>
              <Link to="/match"><input type="button" className="button" value="WS" /></Link>
            </nav>
          </div>

          <Route path="/login" component={LoginContainer} />
          <Route path="/signup" component={Signup} />
          <Route path="/features" component={FeatureContainer} />
          <Route path="/game-list" component={GameList} />
          <Route path="/game" component={GameContainer} />
          <Route path="/match" component={WSComponent} />
      </Router>
    </div>
  );
}

export default App;
