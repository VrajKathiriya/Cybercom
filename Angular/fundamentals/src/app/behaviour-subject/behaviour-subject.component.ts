import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-behaviour-subject',
  templateUrl: './behaviour-subject.component.html',
  styleUrls: ['./behaviour-subject.component.css'],
})
export class BehaviourSubjectComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // subject
    const subject = new Subject();

    subject.subscribe((d) => console.log(d));

    subject.next(20);

    // this call will not happend until call of next method
    subject.subscribe((d) => console.log(d));

    // behaviour subject
    // behaviour subject always return data to subscriber
    const bSubject = new BehaviorSubject<number>(3);

    bSubject.subscribe((d) =>
      console.log(`Behaviour subject subscriber 1 ${d}`)
    );

    bSubject.next(23);

    bSubject.subscribe((d) =>
      console.log(`Behaviour subject subscriber 2 ${d}`)
    );
  }
}
