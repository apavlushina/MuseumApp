import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";

// examples:
import GoogleMap from "../components/GoogleMap";

// consts: [34.0522, -118.2437]
import LOS_ANGELES_CENTER from "../const/la_center";

// InfoWindow component
const InfoWindow = props => {
  const { museum } = props;
  const infoWindowStyle = {
    position: "relative",
    bottom: 150,
    left: "-45px",
    width: 220,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 14,
    zIndex: 100
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>{museum.name}</div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: "grey" }}>{museum.rating} </span>
        <span style={{ color: "orange" }}>
          {String.fromCharCode(9733).repeat(Math.floor(museum.rating))}
        </span>
        <span style={{ color: "lightgrey" }}>
          {String.fromCharCode(9733).repeat(5 - Math.floor(museum.rating))}
        </span>
      </div>
      <div style={{ fontSize: 14, color: "grey" }}>{museum.types[0]}</div>
      <div style={{ fontSize: 14, color: "grey" }}>
        {"$".repeat(museum.price_level)}
      </div>
      <div style={{ fontSize: 14, color: "green" }}>
        {museum.opening_hours.open_now ? "Open" : "Closed"}
      </div>
    </div>
  );
};

// Marker component
const Marker = props => {
  const markerStyle = {
    border: "1px solid white",
    borderRadius: "50%",
    height: 10,
    width: 10,
    backgroundColor: props.show ? "red" : "blue",
    cursor: "pointer",
    zIndex: 10
  };

  return (
    <Fragment>
      <div style={markerStyle} />
      {props.show && <InfoWindow museum={props.museum} />}
    </Fragment>
  );
};

class MarkerInfoWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      museums: []
    };
  }

  componentDidMount() {
    fetch("museums.json")
      .then(response => response.json())
      .then(data => {
        data.results.forEach(result => {
          result.show = false; // eslint-disable-line no-param-reassign
        });
        this.setState({ museums: data.results });
      });
  }

  // onChildClick callback can take two arguments: key and childProps
  onChildClickCallback = key => {
    this.setState(state => {
      const index = state.museums.findIndex(e => e.id === key);
      state.museums[index].show = !state.museums[index].show; // eslint-disable-line no-param-reassign
      return { museums: state.museums };
    });
  };

  render() {
    const { museums } = this.state;

    return (
      <Fragment>
        {!isEmpty(museums) && (
          <GoogleMap
            defaultZoom={10}
            defaultCenter={LOS_ANGELES_CENTER}
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
            onChildClick={this.onChildClickCallback}
          >
            {museums.map(museum => (
              <Marker
                key={museum.id}
                lat={museum.geometry.location.lat}
                lng={museum.geometry.location.lng}
                show={museum.show}
                museum={museum}
              />
            ))}
          </GoogleMap>
        )}
      </Fragment>
    );
  }
}

InfoWindow.propTypes = {
  museum: PropTypes.shape({
    name: PropTypes.string,
    formatted_address: PropTypes.string,
    rating: PropTypes.number,
    types: PropTypes.array,
    price_level: PropTypes.number,
    opening_hours: PropTypes.object
  }).isRequired
};

Marker.propTypes = {
  show: PropTypes.bool.isRequired,
  museum: PropTypes.shape({
    name: PropTypes.string,
    formatted_address: PropTypes.string,
    rating: PropTypes.number,
    types: PropTypes.array,
    price_level: PropTypes.number,
    opening_hours: PropTypes.object
  }).isRequired
};

export default MarkerInfoWindow;
