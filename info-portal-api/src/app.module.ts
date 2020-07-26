import {HttpModule, Module} from '@nestjs/common';
import { ExchangeRatesController } from './exchange-rates/exchange-rates.controller';
import { ExchangeRatesService } from './exchange-rates/exchange-rates.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import {ApiConfigService} from "./config/api-config.service";
import {WeatherService} from "./weather/weather.service";
import {WeatherController} from "./weather/weather.controller";
import {CountriesController} from "./countries/countries.controller";
import {CountriesService} from "./countries/countries.service";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
    load: [configuration],
  })],
  controllers: [
    WeatherController,
    CountriesController,
    ExchangeRatesController,
  ],
  providers: [
    WeatherService,
    ApiConfigService,
    CountriesService,
    ExchangeRatesService,
  ],
})
export class AppModule {
}
