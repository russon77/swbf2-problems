import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import { IApiData, IProblem, IStats } from './api.service';

@Injectable()
export class GoogleSheetsService {

  constructor(private http: HttpClient) {}

  private sheetToArray(sheet: any, columns: string[], columnsMap: {[key: string]: string}): any[] {
    const results = [];

    sheet
      .data[0]
      .rowData
      .slice(1)
      .forEach(
        rowData => {
          const entry = {};

          for (let i = 0; i < rowData.values.length; i++) {
            entry[columnsMap[columns[i]]] = rowData.values[i].formattedValue;
          }

          results.push(entry);
        }
      );

    return results;
  }

  public data(): Observable<IApiData> {
    const now = Date.now();
    const launch = new Date(2017, 10, 17).getTime();

    const daysSinceLaunch = Math.floor((now - launch) / (1000 /* ms to one second */
      * 60 /* seconds to one minute */ * 60 /* minutes to one hour */
      * 24 /* hours to one day */)
    );

    const params = new HttpParams().set('key', environment.apiKey).set('includeGridData', `${true}`);

    return this.http
      .get<any>(
        `https://sheets.googleapis.com/v4/spreadsheets/${environment.spreadsheetId}`,
        {params}
      )
      .map(
        response => {
          const statsColumns = [
            'Issues Count',
            'Votes Count',
            'Current Patch'
          ];

          const statsColumnsMap = {
            'Issues Count': 'problemsCount',
            'Votes Count': 'votesCount',
            'Current Patch': 'currentPatch'
          };

          const stats: IStats = {
            ...this.sheetToArray(response.sheets.filter(sheet => sheet.properties.title === 'Stats')[0], statsColumns, statsColumnsMap)[0],
            daysSinceLaunch
          };

          const problemsColumns = [
            'Timestamp',
            'Source URL',
            'Issue Description',
            'Issue Type',
            'Votes'
          ];

          const problemsColumnsMap = {
            'Timestamp': 'timestamp',
            'Source URL': 'sourceUrl',
            'Issue Description': 'description',
            'Issue Type': 'issueType',
            'Votes': 'votes'
          };

          const problems: IProblem[] = this.sheetToArray(
            response.sheets.filter(sheet => sheet.properties.title === 'Form Responses')[0],
            problemsColumns,
            problemsColumnsMap
          );

          problems.forEach(problem => problem.timestamp = new Date(problem.timestamp).getTime());

          return {
            stats,
            problems
          };
        }
      );
  }
}
