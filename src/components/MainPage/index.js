import React from "react";

import MapWrapper from "./MapWrapper";
import MyHeader from "./MyHeader";

export class MainPage extends React.PureComponent {
  render() {
    return (
      <MapWrapper>
        <MyHeader>museum/kaart\nl on the map</MyHeader>
        <p>
          {" "}
          This map is my personal project with no formal connection with
          museumkaart.nl
        </p>
        <p>
          So before go to the museum - it is better to check the museum's
          web-page just in case :)
        </p>
        <button>Check the list of all museums</button>
        <button>See the map</button>
        <button>Log in and customize your map!</button>
      </MapWrapper>
    );
  }
}

export default MainPage;
