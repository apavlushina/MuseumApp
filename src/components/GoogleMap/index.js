import React from "react";
import GoogleMapReact from "google-map-react";
import supercluster from "points-cluster";

import Marker from "../Marker";
import ClusterMarker from "../ClusterMarker";
import key from "../../key";

import mapStyles from "./mapStyles.json";
import { susolvkaCoords } from "../../fakeData";

import { connect } from "react-redux";
import { getMuseums, setMuseum } from "../../actions/markers";

import MapWrapper from "./MapWrapper";
import MyHeader from "./MyHeader";

const MAP = {
  defaultZoom: 8,
  defaultCenter: susolvkaCoords,
  options: {
    styles: mapStyles,
    maxZoom: 19
  }
};

export class GoogleMap extends React.PureComponent {
  state = {
    mapOptions: {
      center: MAP.defaultCenter,
      zoom: MAP.defaultZoom
    },
    clusters: [],
    key: null
  };

  componentDidMount() {
    this.props.getMuseums();
  }

  getClusters = (museums = []) => {
    const clusters = supercluster(museums, {
      minZoom: 0,
      maxZoom: 16
      // radius: 60
    });

    return clusters(this.state.mapOptions);
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState({
      mapOptions: {
        center,
        zoom,
        bounds
      }
    });
  };

  onChildClickCallback = key => {
    this.setState({ key: Number(key) });
  };

  render() {
    const clusters = this.state.mapOptions.bounds
      ? this.getClusters(this.props.museums).map(
          ({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            numPoints,
            id: points[0].id,
            points
          })
        )
      : [];

    console.log("clusters", clusters);

    return (
      <MapWrapper>
        <MyHeader>museum/kaart\nl on the map</MyHeader>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          options={MAP.options}
          onChange={this.handleMapChange}
          onChildClick={this.onChildClickCallback}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: key }}
        >
          {clusters.map(item => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  key={item.id}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
                  title={item.points[0].title}
                  city={item.points[0].city}
                  selectedKey={this.state.key}
                  museumId={item.id}
                  museums={this.props.museums}
                />
              );
            }

            return (
              <ClusterMarker
                key={item.id}
                lat={item.lat}
                lng={item.lng}
                points={item.points}
              />
            );
          })}
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

// export default GoogleMap;

const mapStateToProps = state => {
  return {
    museums: state.museums
  };
};

export default connect(mapStateToProps, { getMuseums, setMuseum })(GoogleMap);
