import React, {Component} from 'react';
import styles from '../assets/scss/Forms.scss'

class AddCityForm extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {value} = this.state;

    if (value.length < 3) {
        alert('Too short city name')
    } else {
      this.props.onAddCity(value);
      this.setState({
        value: ''
      });

    }

  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  render() {
    return (
      <div className={styles["add-form"]}>
        <form
          onSubmit={this.handleSubmit}
        className={styles["form-block"]}>
          <input
            className={styles.field}
            type="text"
            name="city"
            placeholder="Enter the name of the city:"
            value={this.state.value}
            onChange={this.handleChange}/>
          <button className={styles["add-button"]}>Add</button>
        </form>
      </div>
    );
  }
}

export default AddCityForm;