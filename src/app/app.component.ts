import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public days = 0;

  constructor() {}

  public ngOnInit(): void {
    const now = Date.now();
    const launch = new Date(2017, 10, 17).getTime();

    this.days = Math.floor((now - launch) / (1000 /* ms to one second */
      * 60 /* seconds to one minute */ * 60 /* minutes to one hour */
      * 24 /* hours to one day */)
    );
  }
}
