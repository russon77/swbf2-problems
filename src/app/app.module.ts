import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiService } from './api.service';

import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleSheetsService } from './google-sheets.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    GoogleSheetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
