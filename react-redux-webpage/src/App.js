import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Review from "./components/Review"
import Home from "./components/Home"

function App(props) {
  return (
    <Router>

      <Switch>

        <Route path="/reviews">
          <body>
            <Review />
          </body>
        </Route>

        <Route path="">
            <Home />
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
