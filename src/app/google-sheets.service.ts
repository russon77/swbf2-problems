import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { IApiData } from './api.service';

@Injectable()
export class GoogleSheetsService {

  constructor(private http: HttpClient) {}

  public data(): Observable<IApiData> {
    return this.http.get<IApiData>(environment.api);
  }

  public upvote(desc: string): Observable<any> {
    const params = new HttpParams().set('desc', desc);

    return this.http.post(
      `https://script.google.com/macros/s/AKfycbxlq-rkxrnWl96sq5XjtETH9a_QA3xkFNTt4_OdelLfWf7Mxbni/exec`,
      null,
      {params, responseType: 'text'}
    );
  }
}
