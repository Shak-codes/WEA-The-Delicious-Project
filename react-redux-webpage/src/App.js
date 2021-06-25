import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Review from "./components/Review"
import './App.css';

function App() {
  return (
    <Router>

      <Switch>

        <Route path="/review">
          <Review />
        </Route>

        <Route path="">
            <div className="App">
              <h1>The Delicious Project</h1>
              <h2>Where your voice is heard</h2>
              <Link to="/review"><button id="get-started-button"><span>Get Started</span></button></Link>
            </div>
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
