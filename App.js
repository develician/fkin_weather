import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import Weather from './Weather';
import axios from 'axios';

const API_KEY = "815461e4f4991173dbda38362e9a48b9";


export default class App extends Component {

  weatherCases = {
    "Clouds": {
      bgColor: ['#dee2e6', '#ced4da'],
      iconname: "weather-cloudy"
    },
    "Clear": {
      bgColor: ['#74c0fc', '#a5d8ff'],
      iconname: "weather-sunny"
    },
    "Atmosphere": {
      bgColor: ['#868e96', '#adb5bd'],
      iconname: "weather-fog"
    },
    "Snow": {
      bgColor: ['#f1f3f5', '#f8f9fa'],
      iconname: "weather-snowy"
    },
    "Rain": {
      bgColor: ['#d0bfff', '#b197fc'],
      iconname: "weather-rainy"
    },
    "Drizzle": {
      bgColor: ['#be4bdb', '#cc5de8'],
      iconname: "weather-partlycloudy"
    },
    "Thunderstorm": {
      bgColor: ['#fa5252', '#ff6b6b'],
      iconname: "weather-pouring"
    }
  };

  state = {
    isLoaded: false,
    temp: '',
    weatherCode: '',
    weatherStatus: '',
    weatherId: '',
    weatherCases: null,
    error: null
  };

  componentDidMount() {
    const { getGeoLocationInfos } = this;
    getGeoLocationInfos();
    // this.getInfos();
    // console.log(this.weatherCases.Clouds);
  }

  // getInfos = async () => {
  //   // const { latitude, longitude } = this.state;
  //   await this.getGeoLocationInfos();
  //   await 
  // }

  getGeoLocationInfos = (position) => {
    const { getWeatherInfos } = this;
    navigator.geolocation.getCurrentPosition((position, err) => {

      if (err) {
        this.setState({
          error: err
        });
      }

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      this.setState({
        isLoaded: true
      });

      getWeatherInfos({ latitude, longitude });



    });


  }

  getWeatherInfos = ({ latitude, longitude }) => {
    // console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`);
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`)
      .then(
        (response) => {
          // console.log(response);
          const { weather } = response.data;
          // console.log(response.data.main.temp);
          // const temp = ;
          const weatherCode = weather[0].icon;
          const weatherStatus = weather[0].main;
          const weatherId = weather[0].id;

          switch (weatherId) {
            case 200:
            case 201:
            case 202:
            case 210:
            case 211:
            case 212:
            case 221:
            case 230:
            case 231:
            case 232:
              this.setState({
                temp: Math.floor(response.data.main.temp - 273.15),
                weatherCode: weatherCode,
                weatherStatus: weatherStatus,
                weatherId: weatherId,
                weatherCases: this.weatherCases["Thunderstorm"]
              });
              break;
            case 300:
            case 301:
            case 302:
            case 310:
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
              this.setState({
                temp: Math.floor(response.data.main.temp - 273.15),
                weatherCode: weatherCode,
                weatherStatus: weatherStatus,
                weatherId: weatherId,
                weatherCases: this.weatherCases["Drizzle"]
              });
              break;
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            case 511:
            case 520:
            case 521:
            case 522:
            case 531:
              this.setState({
                temp: Math.floor(response.data.main.temp - 273.15),
                weatherCode: weatherCode,
                weatherStatus: weatherStatus,
                weatherId: weatherId,
                weatherCases: this.weatherCases["Rain"]
              });
              break;
            case 600:
            case 601:
            case 602:
            case 611:
            case 612:
            case 615:
            case 616:
            case 620:
            case 621:
            case 622:
              this.setState({
                temp: Math.floor(response.data.main.temp - 273.15),
                weatherCode: weatherCode,
                weatherStatus: weatherStatus,
                weatherId: weatherId,
                weatherCases: this.weatherCases["Snow"]
              });
              break;
            case 701:
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
            case 771:
            case 781:
              this.setState({
                temp: Math.floor(response.data.main.temp - 273.15),
                weatherCode: weatherCode,
                weatherStatus: weatherStatus,
                weatherId: weatherId,
                weatherCases: this.weatherCases["Atmosphere"]
              });
              break;
            case 800:
              this.setState({
                temp: Math.floor(response.data.main.temp - 273.15),
                weatherCode: weatherCode,
                weatherStatus: weatherStatus,
                weatherId: weatherId,
                weatherCases: this.weatherCases["Clear"]
              });
              break;
            case 801:
            case 802:
            case 803:
            case 804:
              this.setState({
                temp: Math.floor(response.data.main.temp - 273.15),
                weatherCode: weatherCode,
                weatherStatus: weatherStatus,
                weatherId: weatherId,
                weatherCases: this.weatherCases["Clouds"]
              });
              break;
          }

          console.log(this.state.weatherCases);


        }
      )
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    const { isLoaded, error, temp, weatherCode, weatherStatus, weatherCases } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {
          isLoaded ? <Weather 
                      temp={temp} 
                      weatherCode={weatherCode} 
                      weatherStatus={weatherStatus}
                      weatherCases={weatherCases} /> :
            <View style={styles.loading}>
              <Text style={styles.loadingText}>
                Loading Now....
              </Text>
              {
                error && <Text>Error while getting geolocation infos</Text>
              }
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  loading: {
    flex: 1,
    backgroundColor: '#dbe4ff',
    justifyContent: 'flex-end'
  },
  loadingText: {
    padding: 20,
    fontSize: 38,
    fontWeight: '700',
    marginBottom: 50
  }
});
