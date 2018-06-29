import React, {Component} from "react";
import styles from "../assets/scss/ShowBlock.scss";



class ShowBlock extends Component {
  constructor() {
    super();
  }


  render() {
    const {weatherData, activeCityIndex} = this.props;
    let weatherInfo;

    if (!weatherData) {
      return <div>Loading</div>;
    } else {
      const oneCityData = weatherData[activeCityIndex];

      const weatherIcon = oneCityData.weather[0].icon;
      const iconUrl = 'http://openweathermap.org/img/w/' + weatherIcon + '.png';

      weatherInfo = <div className={styles["show-inner"]}>
        <div className={styles["city-head"]}>
          <h2>{oneCityData.name}</h2>
          <img src={iconUrl} alt=""/>
        </div>
         <div className={styles.item}>Country: {oneCityData.sys.country}</div>
         <div className={styles.item}>Temp: {oneCityData.main.temp} °F</div>
         <div className={styles.item}>Clouds: {oneCityData.clouds.all}%</div>
         <div className={styles.item}>Humidity: {oneCityData.main.humidity}%</div>
         <div className={styles.item}>Pressure: {oneCityData.main.pressure} hpa</div>
{/*         <div>Geo coords:
           <a
             href="/weathermap?zoom=12&amp;lat=40.7306&amp;lon=-73.9867">[ {weatherData.coord.lat}, {weatherData.coord.lon} ]</a>
         </div>*/}
       </div>
     }

    // const systemCelsius = this.props.system;


    // const toCelcius = (value, systemCelsius) => {
    //   if (systemCelsius) {
    //     return Math.round((value - 32) * 5 / 9) + ' °C';
    //   } else {
    //     return value + ' °F';
    //   }
    // };

    return (
      <div className={styles["show-block"]}>{weatherInfo}</div>
    );
  }
}

export default ShowBlock;