import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.css'],
})
export class ReplaySubjectComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // reply subject

    // only emit last 2 value
    const $message = new ReplaySubject(2);

    $message.next('Hello');
    $message.next('How are you?');
    $message.next('From where are you?');

    $message.subscribe((d) => console.log(`user 1 ${d}`));

    $message.next('Get vaccinated');
    $message.next('Get vaccinated 2');
    $message.next('Get vaccinated 3');

    $message.subscribe((d) => console.log(`user 2 ${d}`));
  }
}
