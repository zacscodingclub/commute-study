import React from "react";
import PropTypes from "prop-types";

class HomeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(this.state.results);
    this.setState({
      results: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.handleAddHome(this.state.results);
    document.querySelector("input").blur();
  }

  render() {
    return (
      <div>
        <form id="geocoding_form">
          <div className="form-input">
            <label name="address">Home Street Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              placeholder="Find a location..."
              onChange={this.handleChange}
            />
            <input type="button" value="Search" onClick={this.handleSubmit} />
          </div>
        </form>
      </div>
    );
  }
}

HomeForm.propTypes = {
  handleAddHome: PropTypes.func,
  home: PropTypes.object
};
export default HomeForm;
