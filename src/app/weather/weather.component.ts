import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  constructor(public weatherService: WeatherService) { }

  ngOnInit() {}

  getWeather() {
    this.weatherService.getWeather();
  }

  changeSelectedCity(city: string) {
    this.weatherService.selectedCity = city;
  }
}
