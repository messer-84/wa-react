import React, {Component} from 'react';


class Tabs extends Component {
  constructor() {
    super();
    this.changeCity = this.changeCity.bind(this);
  }

  changeCity(e, index) {
    e.preventDefault();
    this.props.onTabClick(index);
  }

  render() {
    const {activeCityIndex, cities, onDeleteCity, weatherData} = this.props;


    const tabs = weatherData ? weatherData.map((item, index) => {
      return (
        <div
          className={`tab ${activeCityIndex === index ? 'active' : ''}`}
          key={item.id}
        >
          <a href="#" onClick={(e) => this.changeCity(e, index)}>
            {item.name}
          </a>
          <button onClick={() => onDeleteCity(index)} />
        </div>
      );
    }) : null;


    return (
      <div className="tabs-block">
        <div className="title">Cities:</div>
        <div className="tabs">
          {tabs}
        </div>
      </div>
    );
  }
}

export default Tabs;