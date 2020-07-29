import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less'],
})

export class WidgetComponent implements OnInit{
  apiData: {
    sys: any
    main: any
    name: string
    isDay: boolean
    country: string
    temp_min: string
    location: string
    humidity: string
    temp_max: string
    feels_like: string
    sunSetTime: Date
    temp_celsius: string
  };
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
    const isDay: boolean = (currentTime.getTime() < sunSetTime.getTime());
    const country: string = this.apiData.sys.country;
    const temp_min: string = (this.apiData.main.temp_min - 273.15).toFixed(0);
    const temp_max: string = (this.apiData.main.temp_max - 273.15).toFixed(0);
    const humidity: string = this.apiData.main.humidity;
    const location: string = this.apiData.name;
    const feels_like: string = (this.apiData.main.feels_like - 273.15).toFixed(0);
    const temp_celsius: string = (this.apiData.main.temp - 273.15).toFixed(0);

    this.apiData = {
      isDay,
      country,
      location,
      humidity,
      temp_min,
      temp_max,
      sunSetTime,
      feels_like,
      temp_celsius,
      ...this.apiData,
    };
  }
}
