import React, {Component} from 'react';
import styles from "../assets/scss/Sidebar.scss";


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
    const {activeCityIndex, onDeleteCity, weatherData} = this.props;


    const tabs = weatherData ? weatherData.map((item, index) => {
      return (
        <div
          className={`${styles.tab} ${activeCityIndex === index ? styles["tab-active"] : ''}`}
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
      <div className={styles["tabs-block"]}>
        <div className={styles.title}>Cities:</div>
        <div className={styles.tabs}>
          {tabs}
        </div>
      </div>
    );
  }
}

export default Tabs;