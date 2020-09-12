import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import LoginContainer from './pages/LoginContainer';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
        </ul>
        <Route path="/login" component={LoginContainer} />
      </div>
    </Router>
  );
}

export default App;
