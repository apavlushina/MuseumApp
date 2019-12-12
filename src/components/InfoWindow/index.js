import React from "react";

import WindowStyled from "./WindowStyled";

class InfoWindow extends React.PureComponent {
  render() {
    return (
      <div>
        <WindowStyled style={{ width: "120px", backgroundColor: "white" }}>
          <div style={{ fontSize: 12 }}>{this.props.museum.title}</div>
          <div style={{ fontSize: 10 }}>{this.props.museum.city}</div>
        </WindowStyled>
      </div>
    );
  }
}

export default InfoWindow;
