import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import LoginContainer from './pages/LoginContainer';
import { GameContainer } from './pages/GameContainer';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/game">Play</Link>
          </li>
        </ul>
        <Route path="/login" component={LoginContainer} />
        <Route path="/game" component={GameContainer} />
      </div>
    </Router>
  );
}

export default App;
