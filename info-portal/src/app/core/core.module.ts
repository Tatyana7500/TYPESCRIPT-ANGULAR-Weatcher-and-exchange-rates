import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  ExchangeRatesService
} from './services';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    ExchangeRatesService,
  ],
  declarations: []
})
export class CoreModule { }
