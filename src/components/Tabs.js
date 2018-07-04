import React, {Component} from 'react';
import styles from "../assets/scss/Sidebar.scss";


class Tabs extends Component {
  onChangeCity = index => e => {
    e.preventDefault();
    this.props.onTabClick(index);
  };

  handleDeleteCity = index => () => {
    this.props.onDeleteCity(index);
  };

  render() {
    const {activeCityIndex, weatherData} = this.props;

    const tabs = weatherData ? weatherData.map((item, index) => {
      return (
        <div
          className={`${styles.tab} ${activeCityIndex === index ? styles['tab-active'] : ''}`}
          key={item.id}
        >
          <a href="#" onClick={this.onChangeCity(index)}>
            {item.name}
          </a>
          <button onClick={this.handleDeleteCity(index)}/>
        </div>
      );
    }) : null;


    return (
      <div className={styles["tabs-block"]}>
        <div className="gl-block">Global</div>
        <div className={styles.title}>Cities:</div>
        <div className={styles.tabs}>
          {tabs}
        </div>
      </div>
    );
  }
}

export default Tabs;