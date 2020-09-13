import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import LoginContainer from './pages/LoginContainer';
import Header from './pages/Header';
import Signup from './pages/Signup';


function App() {
  return (
    <Router>
	  <Header />
      <div>
        <ul>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
            </li>
        </ul>
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={Signup} />
      </div>
    </Router>
  );
}

export default App;
