import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import store from "./store";

import MainPage from "./components/MainPage";
import GoogleMap from "./components/Map/GoogleMap";
import Notfound from "./components/NoMatch";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/map" component={GoogleMap} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
