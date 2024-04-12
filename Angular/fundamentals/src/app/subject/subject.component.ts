import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // observable are unicast
    // const observable = new Observable((obj) => obj.next(Math.random()));

    // // subscriber 1
    // observable.subscribe((data) => console.log(data));

    // // subscriber 2
    // observable.subscribe((data) => console.log(data));

    // // subject are multicast
    // const subject = new Subject();

    // // subscriber 1
    // subject.subscribe((data) => console.log(data));

    // // subscriber 2
    // subject.subscribe((data) => console.log(data));

    // subject.next(Math.random());

    const subject = new Subject();
    const data = ajax('https://dummyjson.com/users');

    subject.subscribe((d) => console.log(d));
    subject.subscribe((d) => console.log(d));

    const result = data.subscribe(subject);
  }
}
