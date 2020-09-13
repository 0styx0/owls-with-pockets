import  React from 'react';
import "./style.css";

function Header() {
    return (
      <div>
	  	<h1>GamePocket</h1>
		<p id="heading">Enjoy some classic board games! How high will you rank?</p>
	
		<input type="button" className="button" value="Featured Games" />
		<input type="button" className="button" value="All Games" />
		<input type="button" className="button" value="Leaderboard" />
		<input type="button" className="button" value="Create Game" />
		<input type="button" className="button" value="My Profile" / >
	  </div>
    );
  }

export default Header;
