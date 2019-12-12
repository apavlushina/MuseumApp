import React from "react";
import PropTypes from "prop-types";

import InfoWindow from "../InfoWindow/index";
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
          <div>
            <MarkerStyled>
              <Icon scale="0.55" />
            </MarkerStyled>
            {/* {this.props.idOne == this.props.idTwo && (
              <InfoWindow museum={this.props.museum} />
            )} */}
            {this.props.museum && <InfoWindow museum={this.props.museum} />}
          </div>
        )}
      </div>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool
};

export default Marker;
