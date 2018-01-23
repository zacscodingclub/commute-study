import React from "react";
import PropTypes from "prop-types";
import DestinationsForm from "./DestinationsForm";
import DestinationsList from "./DestinationsList";

class DestinationsContainer extends React.Component {
  render() {
    const {
      currentDestination,
      destinations,
      handleAddDestination
    } = this.props;

    return (
      <div id="destination-container">
        <DestinationsForm
          handleAddDestination={handleAddDestination}
          currentDestination={currentDestination}
        />
        <DestinationsList destinations={destinations} />
      </div>
    );
  }
}

DestinationsContainer.propTypes = {
  destinations: PropTypes.array,
  handleAddDestination: PropTypes.func,
  currentDestination: PropTypes.object
};

export default DestinationsContainer;
