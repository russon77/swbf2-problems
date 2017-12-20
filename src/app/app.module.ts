import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiService } from './api.service';

import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleSheetsService } from './google-sheets.service';
import { CategoryPipe } from './category.pipe';
import { SortPipe } from './sort.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CategoryPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService,
    GoogleSheetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
