import React from "react";
import PropTypes from "prop-types";
class DestinationsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      type: "work",
      mode: "walk"
    };

    this.buildSelect = this.buildSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      address: this.props.currentDestination.address
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.address === "" &&
      nextProps.currentDestination.address !== ""
    ) {
      this.setState({
        address: nextProps.currentDestination.address
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAddClick(event) {
    this.props.handleAddDestination(this.state);
    this.setState({
      address: "",
      type: "work",
      mode: "walk"
    });
  }

  buildSelect(attr, data) {
    return (
      <select name={attr} onChange={this.handleChange}>
        {data.map((d, i) => (
          <option key={i} value={d}>
            {d}
          </option>
        ))}
      </select>
    );
  }

  render() {
    const types = ["work", "school", "park", "grocery"];
    const modes = ["walk", "bike", "transit", "drive"];
    return (
      <div id="destination-form">
        <label name="address">What is the address? (Or click on map)</label>
        <input
          type="text"
          placeholder="Input Address"
          name="address"
          value={this.state.address}
          onChange={this.handleChange}
        />
        <label name="types">What type of destination?</label>
        {this.buildSelect("type", types)}
        <label name="modes">How do you get there?</label>
        {this.buildSelect("mode", modes)}
        <input
          type="button"
          value="Add Destination"
          onClick={this.handleAddClick}
        />
      </div>
    );
  }
}

DestinationsForm.propTypes = {
  handleAddDestination: PropTypes.func,
  currentDestination: PropTypes.object
};

export default DestinationsForm;
