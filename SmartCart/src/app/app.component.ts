import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'SmartCart';

  constructor(private router: Router) {}

  pathName: any;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.pathName = event.url;
      }
    });
  }

  parentData: any;

  receiveData(data: any) {
    this.parentData = data;
  }
}
