import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Weather, City } from '../../models';
import { dataCities } from '../../managers/managers';

@Injectable({providedIn: 'root'})
export class WeatherService implements OnInit {
    cities: City[] = dataCities;
    weather: Weather[] = [];
    selectedCity: string;

    constructor(private http: HttpClient) {}

    ngOnInit() {}

    getWeather() {
      const weather = this.weather.find(item => item.city === this.selectedCity);

      if (this.selectedCity && !weather) {
        this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.selectedCity}&appid=7802e9420cad1e835c4f7aefa0959661`)
          .subscribe(data => {
            this.weather.push(this.getWeatherObject(data));
          });
      }
    }

    getWeatherObject(data): Weather {
      const weather: Weather = {
        city: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        humidity: data.main.humidity,
        visibility: data.visibility,
        temperature: Math.round(data.main.temp - 273),
      };

      return weather;
    }
}
