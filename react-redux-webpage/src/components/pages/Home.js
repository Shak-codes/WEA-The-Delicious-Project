import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import '../../App.css';

function Home() {
    return (
            <div className="App">
              <h1 id="home-title">The Delicious Project</h1>
              <h2 id="home-title-description">Where your voice is heard</h2>
              <Link to="/reviews"><button id="get-started-button"><span>Get Started</span></button></Link>
            </div>
    )
}

export default Home;