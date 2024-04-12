import { Component, OnInit } from '@angular/core';
import { AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-async-subject',
  templateUrl: './async-subject.component.html',
  styleUrls: ['./async-subject.component.css'],
})
export class AsyncSubjectComponent implements OnInit {
  ngOnInit(): void {
    // async subject
    // const asyncSubject$ = new AsyncSubject();

    // asyncSubject$.next('value 1');
    // asyncSubject$.next('value 2');
    // asyncSubject$.next('value 3');

    // // asyncSubject$.complete();
    // asyncSubject$.next('value 4');

    // asyncSubject$.subscribe((d) => console.log(`user 1 ${d}`));
    // asyncSubject$.next('value 5');
    // // pass last emited value to all subscriber
    // asyncSubject$.complete();

    // asyncSubject$.subscribe((d) => console.log(`user 2 ${d}`));

    const url = 'https://restcountries.com/v3.1/name/india?fullText=true';

    const cache: { [url: string]: AsyncSubject<any> } = {};
    function getCountryInfo(url: string) {
      if (!cache[url]) {
        // api call using fetch
        cache[url] = new AsyncSubject();
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            cache[url].next(data);
            cache[url].complete();
          })
          .catch((err) => console.log(err));
      }
      console.log(cache);
      return cache[url].asObservable();
    }

    getCountryInfo(url).subscribe((d) => console.log(d));

    setTimeout(() => {
      getCountryInfo(url).subscribe((d) => console.log(d));
    }, 2000);
  }
}
