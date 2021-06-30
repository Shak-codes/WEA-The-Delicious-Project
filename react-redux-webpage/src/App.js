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

        <Route path="/reviews/toronto"><TorontoRestaurants /></Route>
        <Route path="/reviews/waterloo"><WaterlooRestaurants /></Route>
        <Route path="/reviews/ottawa"><OttawaRestaurants /></Route>
        <Route path="/reviews/brampton"><BramptonRestaurants /></Route>

        <Route path="/reviews">
            <Review />
        </Route>

        <Route path="">
          <Home />
        </Route>

      </Switch>
      
    </Router>
  );
}

export default App;
