import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css'],
})
export class ObservableComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    // promise

    const promise = new Promise((resolve) => {
      // promise called will be printed wheater it is resolve or not
      console.log('promise called');
      setTimeout(() => {
        // promise will return single value
        // only one time promise will return
        resolve('Promise working1');
        resolve('Promise working2');
        resolve('Promise working3');
      }, 1000);
    });

    // promise.then((data) => console.log(data));

    // observable
    const observable = new Observable((sub) => {
      console.log('observale called');
      setTimeout(() => {
        // observable can return multiple value
        sub.next('Observable working1');
        sub.next('Observable working2');
        sub.next('Observable working3');
      }, 1000);
    });

    // observable.subscribe((result) => console.log(result));

    observable
      .pipe(filter((d) => d === 'Observable working2'))
      .subscribe((result) => console.log(result));
  }

  ngOnDestroy(): void {
    // unsubscribe code will be here
  }
}
