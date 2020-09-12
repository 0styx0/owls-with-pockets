import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import LoginComponent from './pages/LoginComponent';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
        </ul>
        <Route path="/login" component={LoginComponent} />
      </div>
    </Router>
  );
}

export default App;
