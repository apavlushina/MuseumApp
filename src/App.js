import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";

import GoogleMap from "./components/GoogleMap";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <GoogleMap />
        </div>
      </Provider>
    );
  }
}

export default App;
