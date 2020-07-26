import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface Weather {
  city: string
  icon: string
  date: any
  humidity: number
  visibility: number
  temperature: number
}

@Injectable({providedIn: 'root'})
export class WeatherService implements OnInit{
    public city: string[] = ['Kiev', 'Baku', 'London', 'Los Angeles', 'New York'];
    public weather: Weather;

    constructor(private http: HttpClient) {}

    ngOnInit() {}

    getRequestWeather(city: string) {
      this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7802e9420cad1e835c4f7aefa0959661`)
        .subscribe(data => {
          this.weather = this.getWeatherObject(data);
      });
    }

    getWeatherObject(data): Weather {
      const weather: Weather = {
        city: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        date: new Date(),
        humidity: data.main.humidity,
        visibility: data.visibility,
        temperature: Math.round(data.main.temp - 273),
      };

      return weather;
    }
}
