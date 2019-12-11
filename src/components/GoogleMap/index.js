import React from "react";
import GoogleMapReact from "google-map-react";
import supercluster from "points-cluster";

import Marker from "../Marker";
import ClusterMarker from "../ClusterMarker";
import key from "../../key";

import mapStyles from "./mapStyles.json";
import { markersData, susolvkaCoords } from "../../fakeData";

import { connect } from "react-redux";
import { getMuseums } from "../../actions/markers";

import MapWrapper from "./MapWrapper";

const MAP = {
  defaultZoom: 8,
  defaultCenter: susolvkaCoords,
  options: {
    styles: mapStyles,
    maxZoom: 19
  }
};

export class GoogleMap extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    mapOptions: {
      center: MAP.defaultCenter,
      zoom: MAP.defaultZoom
    },
    clusters: []
  };

  componentDidMount() {
    console.log("start didMount");
    this.props.getMuseums();
    console.log("do we have state?", this.props.museums);
  }

  getClusters = () => {
    if (this.props.museums) {
      console.log(this.props.museums, this.props.museums);
      const clusters = supercluster(this.props.museums, {
        minZoom: 0,
        maxZoom: 16,
        radius: 60
      });

      return clusters(this.state.mapOptions);
    }
  };

  createClusters = props => {
    if (this.props.museums) {
      this.setState({
        clusters: this.state.mapOptions.bounds
          ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
              lat: wy,
              lng: wx,
              numPoints,
              id: `${numPoints}_${points[0].id}`,
              points
            }))
          : []
      });
    }
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds
        }
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };

  render() {
    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          options={MAP.options}
          onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: key }}
        >
          {this.state.clusters.map(item => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  key={item.id}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
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
    museums: state.museums.museums
  };
};

export default connect(mapStateToProps, { getMuseums })(GoogleMap);
