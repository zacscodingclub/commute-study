import React from "react";
import PropTypes from "prop-types";
import Map, { GoogleApiWrapper, Marker } from "google-maps-react";
import HomeIcon from "images/home_icon.png";

class MapContainer extends React.Component {
  buildHomeMarkers() {
    const { homes } = this.props;

    return homes.map((pt, i) => {
      const coordinates = { lat: pt.lat, lng: pt.lng };
      return (
        <Marker
          title={pt.address}
          name={`Home ${i}`}
          position={coordinates}
          icon={HomeIcon}
          key={i}
        />
      );
    });
  }

  buildDestinationMarkers() {
    const { destinations } = this.props;

    return destinations.map((pt, i) => {
      const coordinates = { lat: pt.lat, lng: pt.lng };
      return (
        <Marker
          title={pt.address}
          name={`Home ${i}`}
          position={coordinates}
          key={i}
        />
      );
    });
  }

  render() {
    const center = {
      lat: 34.0522,
      lng: -118.2437
    };
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={9}
          initialCenter={center}
          center={center}
          containerStyle={{
            position: "relative",
            width: "100%",
            height: "450px",
            margin: "0 auto"
          }}
        >
          {this.buildHomeMarkers()}
          {this.buildDestinationMarkers()}
        </Map>
      </div>
    );
  }
}

MapContainer.propTypes = {
  homes: PropTypes.array,
  destinations: PropTypes.array
};

export default GoogleApiWrapper({
  apiKey: process.env.GMAPS_KEY
})(MapContainer);
