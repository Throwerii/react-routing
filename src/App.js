import React, { Component } from "react";
import { Route,Switch } from "react-router-dom";
import './App.css';
import Clock from './component/assets/clock/Clock'
import Contact from './component/assets/contact/Contact'
import Welcome from './component/assets/welcome/Welcome'
import Navigation from "./component/assets/navigation/Navigation";
import Error from './component/assets/error/Error'

class App extends Component {
  
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
        <Route
          exact
          path="/welcome/:name"
          render={(props) => <Welcome {...props} />}
        />
        <Route path="/clock" component={Clock} />
        <Route path="/contact" component={Contact} />
        <Route component={Error}></Route> 
        </Switch>
      </div>
    );
  }
}

export default App;
