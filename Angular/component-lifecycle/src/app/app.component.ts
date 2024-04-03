import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  count: number = 0;
  isHome: boolean = false;

  constructor(private route: Router) {
    console.log('app constructor called');
  }

  ngOnInit(): void {
    console.log('app ngOnInit called');
  }

  goToHome() {
    this.isHome = true;
  }

  increment() {
    this.count++;
  }
}
