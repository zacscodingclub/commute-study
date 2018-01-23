import React from "react";
import PropTypes from "prop-types";
import Map, { GoogleApiWrapper, Marker } from "google-maps-react";
import HomeIcon from "images/home_icon.png";

class MapForm extends React.Component {
  constructor(props) {
    super(props);

    this.mapClick = this.mapClick.bind(this);
  }

  mapClick(mapProps, map, clickEvent) {
    this.props.handleMapClick(mapProps, map, clickEvent);
  }

  buildHomeMarker() {
    const { home } = this.props;
    if (home.address != "") {
      return (
        <Marker
          title={`Your Home at `}
          name={"Home"}
          position={home.coordinates}
          icon={HomeIcon}
        />
      );
    }
  }

  buildDestinationMarkers() {
    const { destinations } = this.props;

    if (destinations.length > 0) {
      return destinations.map((d, i) => (
        <Marker
          title={`Destination ${i}`}
          name={`Destination ${i}`}
          position={d.coordinates}
          key={i}
        />
      ));
    }
  }

  render() {
    const { home, destinations, google, homeSet } = this.props;

    return (
      <div className="map-holder">
        <Map
          google={google}
          zoom={homeSet ? 11 : 8}
          initialCenter={home.coordinates}
          center={home.coordinates}
          containerStyle={{
            position: "relative",
            width: "100%",
            height: "450px",
            margin: "0 auto"
          }}
          onClick={this.mapClick}
        >
          {this.buildHomeMarker()}
          {this.buildDestinationMarkers()}
        </Map>
      </div>
    );
  }
}

MapForm.propTypes = {
  destinations: PropTypes.array,
  home: PropTypes.object,
  handleMapClick: PropTypes.func,
  homeSet: PropTypes.bool
};

export default GoogleApiWrapper({
  apiKey: process.env.GMAPS_KEY
})(MapForm);
