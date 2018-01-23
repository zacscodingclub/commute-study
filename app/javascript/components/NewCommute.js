import React from "react";
import PropTypes from "prop-types";
import HomeForm from "./HomeForm";
import MapForm from "./MapForm";
import DestinationsContainer from "./DestinationsContainer";

class NewCommute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      homeSet: false,
      home: {
        address: "",
        coordinates: {
          lat: 34.0522,
          lng: -118.2437
        }
      }, // address, lat, lng
      currentDestination: {
        address: "",
        coordinates: {
          lat: 0,
          lng: 0
        }
      },
      destinations: []
    };

    this.addHome = this.addHome.bind(this);
    this.addToDestinations = this.addToDestinations.bind(this);
    this.confirmHomeAddress = this.confirmHomeAddress.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.submitData = this.submitData.bind(this);
    this.toggleHomeSet = this.toggleHomeSet.bind(this);
    this.topMessage = this.topMessage.bind(this);
  }

  addHome(location) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${
      process.env.GMAPS_KEY
    }`;

    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(response => {
        const result = response.results[0];

        this.setState({
          home: {
            address: result.formatted_address,
            coordinates: result.geometry.location
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  addToDestinations(destination) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${
      destination.address
    }&key=${process.env.GMAPS_KEY}`;
    const dattributes = {
      type: destination.type,
      mode: destination.mode
    };
    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(response => {
        const result = response.results[0];

        const newDestination = Object.assign(
          {},
          {
            address: result.formatted_address,
            coordinates: result.geometry.location
          },
          dattributes
        );

        const newDestinations = [...this.state.destinations, newDestination];
        this.setState({
          destinations: newDestinations,
          currentDestination: {
            address: "",
            coordinates: {
              lat: 0,
              lng: 0
            }
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  confirmHomeAddress() {
    const { home } = this.state;
    return (
      <div>
        <p>{home.address}</p>
        <button id="confirm-button" onClick={this.toggleHomeSet}>
          Confirm
        </button>
      </div>
    );
  }

  handleMapClick(mapProps, map, clickEvent) {
    if (!this.state.homeSet) {
      const latLngString = `${clickEvent.latLng.lat()},${clickEvent.latLng.lng()}`;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLngString}&key=${
        process.env.GMAPS_KEY
      }`;

      fetch(url)
        .then(data => {
          return data.json();
        })
        .then(response => {
          const result = response.results[0];

          this.setState({
            home: {
              address: result.formatted_address,
              coordinates: result.geometry.location
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      const latLngString = `${clickEvent.latLng.lat()},${clickEvent.latLng.lng()}`;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLngString}&key=${
        process.env.GMAPS_KEY
      }`;

      fetch(url)
        .then(data => {
          return data.json();
        })
        .then(response => {
          const result = response.results[0];

          this.setState({
            currentDestination: {
              address: result.formatted_address,
              coordinates: result.geometry.location
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  submitData(event) {
    event.preventDefault();
    const data = {
      commuter: {
        home: this.state.home,
        destinations: this.state.destinations
      }
    };

    fetch("/commuters", {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res)
      .then(response =>
        this.setState({
          submitted: true
        })
      )
      .catch(error => console.log(`Error: ${error}`));
  }

  toggleHomeSet(event) {
    this.setState({
      homeSet: !this.state.homeSet
    });
  }

  topMessage() {
    if (!this.state.homeSet) {
      return (
        <div>
          <p>
            <strong>Alta Planning + Design</strong> in collaboration with the
            <strong> City of Los Angeles</strong> is conducting a study to learn
            more about the people of Los Angeles and where they commute.
          </p>

          <p>
            To get started, you can either enter your address or click on the
            map to pinpoint your home.
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            Now that you have set your home, add a few of your frequent
            desinations below the map!
          </p>
        </div>
      );
    }
  }

  renderForm() {
    const {
      homeSet,
      home,
      currentDestination,
      destinations,
      submitted
    } = this.state;
    return (
      <div>
        {this.topMessage()}
        {!homeSet && (
          <HomeForm
            handleAddHome={this.addHome}
            toggleHomeSet={this.toggleHomeSet}
            home={home}
          />
        )}

        <MapForm
          homeSet={homeSet}
          home={home}
          destinations={destinations}
          handleMapClick={this.handleMapClick}
        />
        {!homeSet && home.address != "" && this.confirmHomeAddress()}
        {homeSet && (
          <DestinationsContainer
            currentDestination={currentDestination}
            destinations={destinations}
            handleAddDestination={this.addToDestinations}
          />
        )}
        {homeSet &&
          destinations.length > 0 && (
            <button onClick={this.submitData}>Submit Data</button>
          )}
      </div>
    );
  }
  render() {
    const { submitted } = this.state;
    return (
      <div>
        {submitted ? (
          <h3>
            Thanks for adding to the study! We appreciate your contribution and
            if you would like to add another data point, please click on the New
            Commuter link above.
          </h3>
        ) : (
          this.renderForm()
        )}
      </div>
    );
  }
}

export default NewCommute;
