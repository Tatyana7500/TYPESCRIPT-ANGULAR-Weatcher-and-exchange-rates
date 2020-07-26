import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import {ExchangeRate} from "../models";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";

const mockExchangeRates: ExchangeRate[] = [
  {
    currency: 'USD',
    saleRate: 27.8,
    baseCurrency: 'UAH',
    purchaseRate: 28.0,
  },
  {
    currency: 'EUR',
    saleRate: 30.5,
    baseCurrency: 'UAH',
    purchaseRate: 31.0,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesService {

  constructor(
    private http: HttpClient,
  ) { }

  getExchangeRates(): Observable<ExchangeRate[]> {
    return this.http.get<ExchangeRate[]>(`${environment.exchange_rates_api_url}`);
  }
}
