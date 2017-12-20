import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService, IApiData, IProblem } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public data$: Observable<IApiData>;

  constructor(private api: ApiService) {}

  public ngOnInit(): void {
    this.data$ = this.api.data();
    // this.api.data().subscribe();
  }

  public onVote(problem: IProblem): void {

  }
}
