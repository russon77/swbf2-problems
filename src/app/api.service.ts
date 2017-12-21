import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { GoogleSheetsService } from './google-sheets.service';

export interface IStats {
  problemsCount: number;
  votesCount: number;
  currentPatch: string;
  daysSinceLaunch: number;
}

type IssueTypeEnum = 'Quality Control' | 'Poor Decision' | 'Bug' | 'Missing Content';

export interface IProblem {
  timestamp: number;
  sourceUrl?: string;
  description: string;
  issueType: IssueTypeEnum;
  votes: number;
}

export interface IApiData {
  stats: IStats;
  problems: IProblem[];
}

@Injectable()
export class ApiService {

  constructor(private sheetService: GoogleSheetsService) {}

  data(): Observable<IApiData> {
    return this.sheetService.data();
  }

  upvote(problem: IProblem): Observable<void> {
    return this.sheetService.upvote(problem.description);
  }
}
