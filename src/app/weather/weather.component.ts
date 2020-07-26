import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/weather/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  constructor(public weatherService: WeatherService) { }

  ngOnInit() {}

  getWeatherByCity(city: string) {
    this.weatherService.getRequestWeather(city);
  }
}
