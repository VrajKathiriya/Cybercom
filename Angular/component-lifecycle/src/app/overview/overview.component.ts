import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnChanges, OnInit, OnDestroy {
  @Input() data: any;

  constructor() {
    console.log('overview constructor called');
  }

  // called whenever changes happend in @input
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  // called only once when component is initialized
  ngOnInit(): void {
    console.log('overview ngOnInit called');
  }

  // called only once when component is destroyed
  ngOnDestroy(): void {
    console.log('overview ngOnDestroy called');
  }
}
