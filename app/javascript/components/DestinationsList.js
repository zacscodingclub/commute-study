import React from "react";
import PropTypes from "prop-types";
class DestinationsList extends React.Component {
  showList(destinations) {
    return <ul>{destinations.map((d, i) => <li key={i}>{d.address}</li>)}</ul>;
  }
  render() {
    const { destinations } = this.props;
    return (
      <div id="destination-list">
        {destinations.length > 0
          ? this.showList(destinations)
          : "Please add a few destinatons!"}
      </div>
    );
  }
}

DestinationsList.propTypes = {
  destinations: PropTypes.array
};
export default DestinationsList;
