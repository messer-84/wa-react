import React, {Component} from 'react';
import '../assets/App.scss';
import Tabs from './Tabs';
import ShowBlock from './ShowBlock';
import AddCityForm from "./AddCityForm";

const key = 'f63a9d133e62d5885fbfa33e55c71be2';


class App extends Component {
  constructor() {
    super();
    this.state = {
      activeCityIndex: 0,
      cities: [
        {name: "New York", id: 5128581},
        {name: "Toronto", id: 6167865}
      ],
      weatherData: null,
    };
  }

  componentWillMount() {
    console.log('comp will mount');

    localStorage.getItem('localState') && this.setState(JSON.parse(localStorage.getItem('localState')));
  }


  componentDidMount() {

    const date = localStorage.getItem('infoDate');
    const infoDate = date && new Date(parseInt(date));
    const now = new Date();

    const dataAge = Math.round((now - infoDate) / (1000 * 60)); // in minutes
    const tooOld = dataAge >= 2;

    if (tooOld) {
      this.fetchData();
    } else {
      console.log(`Using data from localStorage that are ${dataAge} minutes old.`);
    }


  }

  componentWillUpdate(nextProps, nextState) {
    console.log('comp will update');
    localStorage.setItem('localState',
      JSON.stringify(nextState));
    localStorage.setItem('infoDate', Date.now());
  }

  fetchData() {
    const ids = this.state.cities.map(city => city.id).join(',');
    const URL = `http://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&appid=${key}`;

    fetch(URL)
      .then(res => res.json())
      .then(data => {
        this.setState({
          weatherData: data.list,
          activeCityIndex: 0
        });
      });
  }


  toggleTabCities = (index) => {
    this.setState({
      activeCityIndex: index,
    });

  };

  onAddCity = (city) => {
    const arrayNotUniq = this.state.weatherData.filter(item => {
      return item.name.toLowerCase() === city.toLowerCase();
    });

    if (arrayNotUniq.length === 0) {
      const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;

      fetch(URL)
        .then(res => res.json())
        .then(data => {
          const newWeatherData = [...this.state.weatherData, data];
          const cod = data.cod || false;

          if (cod !== "404") {
            this.setState({
              weatherData: newWeatherData,
              activeCityIndex: newWeatherData.length - 1
            });
          }
          else {
            alert(`The city doesn't exist or error in name - ${city}`);
          }

        })
        .catch(err => {
          console.log(err.message);
        });
    }
    else {
      alert('This city is already in the list of cities')
    }

  };


  onDeleteCity = (indexWillDelete) => {
    console.log('delete');

    const {weatherData, activeCityIndex} = this.state;
    let newActiveCityIndex;
    const newWeatherData = weatherData.filter(item => {
      return weatherData[indexWillDelete] !== item;
    });
    const newWDLength = newWeatherData.length;


    //if delete first and active first
    if (indexWillDelete === 0 && activeCityIndex === 0) {
      newActiveCityIndex = 0;
    }
    //if delete last and active last
    else if (indexWillDelete === weatherData.length - 1 && activeCityIndex === weatherData.length - 1) {
      newActiveCityIndex = newWeatherData.length - 1;
    }
    else {
      //if deleteI < activeI
      if(indexWillDelete > activeCityIndex){
        newActiveCityIndex = activeCityIndex
      }
      else{
        newActiveCityIndex = activeCityIndex - 1;
      }
    }

    if(newWDLength > 0){
      this.setState({
        activeCityIndex: newActiveCityIndex,
        weatherData: newWeatherData
      });
    }
    else{
      alert("You can't delete last city ");
    }
  };


  render() {
    const {activeCityIndex, cities, weatherData} = this.state;


    return (
      <div className="container">
        <h1>Weather App</h1>
        <div className="row">
          <div className="main">
            <AddCityForm onAddCity={this.onAddCity}/>
            <ShowBlock weatherData={weatherData} activeCityIndex={activeCityIndex}/>
          </div>
          <div className="sidebar">
            <Tabs
              activeCityIndex={activeCityIndex}
              cities={cities}
              weatherData={weatherData}
              onTabClick={this.toggleTabCities}
              onDeleteCity={this.onDeleteCity}
            />
          </div>

        </div>
      </div>
    );
  }
}


export default App;
