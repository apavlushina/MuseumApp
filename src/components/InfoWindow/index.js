import React from "react";
import { Link } from "react-router-dom";

import WindowStyled from "./WindowStyled";
import Img from "./Img.js";

class InfoWindow extends React.PureComponent {
  render() {
    return (
      <div>
        <WindowStyled>
          <Link
            href={`https://www.museumkaart.nl/museum/${this.props.museum.title}.aspx`}
          >
            {" "}
            <Img>
              <img
                className="museumImg"
                src={this.props.museum.url}
                alt="museum.title"
                width="50px"
                style={{ marginRight: "10px" }}
              />
            </Img>
          </Link>
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
