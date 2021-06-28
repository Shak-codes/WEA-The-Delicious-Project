import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Review from "./components/pages/Review"
import Home from "./components/pages/Home"
import TorontoRestaurants from './components/pages/Locations/Toronto/Toronto';
import WaterlooRestaurants from './components/pages/Locations/Waterloo/Waterloo';
import OttawaRestaurants from './components/pages/Locations/Ottawa/Ottawa';
import BramptonRestaurants from './components/pages/Locations/Brampton/Brampton';

function App(props) {
  return (
    <Router>

      <Switch>

        <Route path="/reviews/toronto"><TorontoRestaurants/></Route>
        <Route path="/reviews/waterloo"><h1><WaterlooRestaurants/></h1></Route>
        <Route path="/reviews/ottawa"><h1><OttawaRestaurants/></h1></Route>
        <Route path="/reviews/brampton"><h1><BramptonRestaurants/></h1></Route>

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
