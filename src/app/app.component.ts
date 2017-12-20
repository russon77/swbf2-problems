import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService, IApiData, IProblem } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public problemTagColors: {[key: string]: string} = {
    'Quality Control': 'is-info',
    'Poor Decision': 'is-warning',
    'Bug': 'is-danger',
    'Missing Content': 'is-primary'
  };

  public categoriesFilter: string[] = [];
  public sortFilter = 'Votes';

  public data$: Observable<IApiData>;

  constructor(private api: ApiService) {}

  public ngOnInit(): void {
    this.data$ = this.api.data();
  }

  public onVote(problem: IProblem): void {}
}
