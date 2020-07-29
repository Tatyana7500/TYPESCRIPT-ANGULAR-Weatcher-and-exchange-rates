import { Component, OnInit}  from '@angular/core';
import { Weather } from '../../../../core/models';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less'],
})

export class WidgetComponent implements OnInit{
  apiData: Weather;
  currentLocation: any;
  pinIcon = 'assets/icons/pin.svg';
  sunIcon = 'assets/icons/sun.svg';
  tempIcon = 'assets/icons/temp.svg';
  moonIcon = 'assets/icons/moon.svg';

  constructor() {
    this.apiData = {
      sys: undefined,
      main: undefined,
      name: '',
      isDay: true,
      country: '',
      humidity: '',
      temp_min: '',
      location: '',
      temp_max: '',
      feels_like: '',
      sunSetTime: new Date(),
      temp_celsius: '',
    };
    this.currentLocation = {
      latitude: 0,
      longitude: 0,
    };
  }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation(): void {
      navigator.geolocation.getCurrentPosition(this.setCurrentLocation);
  }

  setCurrentLocation = ({coords}): void => {
    const {latitude, longitude} = coords;
    this.currentLocation = {
      latitude,
      longitude
    };
    this.getData();
  }

  getData(): void {
    this.getCurrentLocation();
    try {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.currentLocation.latitude}&lon=${this.currentLocation.longitude}&appid=7802e9420cad1e835c4f7aefa0959661`)
        .then(resp => resp.json())
        .then(data => {
          this.setData(data);
          console.log(data);
        })
        .catch(error => console.log(error.message));
    } catch (e) {
      console.log('Fetch error');
    }
  }

  setData(data): void {
    this.apiData = data;
    const currentTime: Date = new Date();
    const sunSetTime: Date = new Date(this.apiData.sys.sunset * 1000);

    this.apiData = {
      isDay: (currentTime.getTime() < sunSetTime.getTime()),
      country: this.apiData.sys.country,
      location: this.apiData.name,
      humidity: this.apiData.main.humidity,
      temp_min: (this.apiData.main.temp_min - 273.15).toFixed(0),
      temp_max: (this.apiData.main.temp_max - 273.15).toFixed(0),
      sunSetTime,
      feels_like: (this.apiData.main.feels_like - 273.15).toFixed(0),
      temp_celsius: (this.apiData.main.temp - 273.15).toFixed(0),
      ...this.apiData,
    };
  }
}
