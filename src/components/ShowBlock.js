import React, {Component} from "react";

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

      weatherInfo = <div className="show-block">
        <div className="city-head">
          <h2>{oneCityData.name}</h2>
          <img src={iconUrl} alt=""/>
        </div>
         <div className="item">Country: {oneCityData.sys.country}</div>
         <div className="item">Temp: {oneCityData.main.temp} °F</div>
         <div className="item">Clouds: {oneCityData.clouds.all}%</div>
         <div className="item">Humidity: {oneCityData.main.humidity}%</div>
         <div className="item">Pressure: {oneCityData.main.pressure} hpa</div>
       </div>
     }

    return (
      <div>{weatherInfo}</div>
    );
  }
}

export default ShowBlock;