import React from "react";

import WindowStyled from "./WindowStyled";

class InfoWindow extends React.PureComponent {
  render() {
    return (
      <div>
        <WindowStyled>
          <img
            src={this.props.museum.url}
            alt="museum.title"
            width="50px"
            style={{ marginRight: "10px" }}
          />
          <div>
            <div style={{ fontSize: 10 }}>{this.props.museum.title}</div>
            <div style={{ fontSize: 8 }}>{this.props.museum.city}</div>
          </div>
        </WindowStyled>
      </div>
    );
  }
}

export default InfoWindow;
