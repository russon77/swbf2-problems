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

  public swIcons = [
    'admiral-ackbar.png',
    'darth-maul.png',
    'han-solo.png',
    'obiwan-kenobi.png',
    'stormtrooper.png',
    'boba-fett.png',
    'darth-vader.png',
    'jabba-the-hutt.png',
    'princess-leia.png',
    'tusken-raider.png',
    'c3p0.png',
    'emperor-palpatine.png',
    'jango-fett.png',
    'qui-gon-jinn.png',
    'yoda.png',
    'chewbacca.png',
    'ewok.png',
    'jawa.png',
    'lobot.png',
    'r2d2.png',
    'clone-trooper.png',
    'greedo.png',
    'lando-calrissian.png',
    'luke-skywalker.png',
    'red-five.png'
  ];

  public loadingStatus: {[key: string]: 'loading' | 'finished'} = {};

  public categoriesFilter: string[] = [];
  public sortFilter = 'Votes';

  public data$: Observable<IApiData>;

  constructor(private api: ApiService) {}

  public ngOnInit(): void {
    this.data$ = this.api.data();
  }

  public onVote(problem: IProblem): void {
    // prevent voting more than once on a single issue
    if (['loading', 'finished'].includes(this.loadingStatus[problem.description])) {
      return;
    }

    this.loadingStatus[problem.description] = 'loading';

    this.api.upvote(problem)
      .subscribe(
        () => {
          this.loadingStatus[problem.description] = 'finished';
          this.data$ = this.api.data();
        }
      );
  }
}
