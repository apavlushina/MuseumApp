import React from "react";
import PropTypes from "prop-types";

import MarkerStyled from "./MarkerStyled";
import MarkerInGroupStyled from "./MarkerInGroupStyled";
import Icon from "../Icon";

class Marker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false
  };

  render() {
    return (
      <div>
        {this.props.inGroup ? (
          <MarkerInGroupStyled>
            <Icon scale="0.55" />
          </MarkerInGroupStyled>
        ) : (
          <MarkerStyled>
            <Icon scale="0.55" />
          </MarkerStyled>
        )}
      </div>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool
};

export default Marker;
