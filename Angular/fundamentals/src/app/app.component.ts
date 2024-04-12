import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'fundamentals';

  students: any[] = [
    { name: 'vraj', age: 21 },
    { name: 'ram', age: 22 },
    { name: 'shyam', age: 23 },
    { name: 'sita', age: 24 },
    { name: 'gita', age: 25 },
    { name: 'john', age: 26 },
  ];

  switchValue: number = 2;

  list: number[] = [1, 2, 3, 4];

  toggle: boolean = true;

  refresh(): void {
    this.students = [
      { name: 'vraj', age: 21 },
      { name: 'ram', age: 22 },
      { name: 'shyam', age: 23 },
      { name: 'sita', age: 24 },
      { name: 'gita', age: 25 },
      { name: 'john', age: 26 },
      { name: 'john', age: 27 },
    ];
  }

  refreshStudent(index: number, student: any): string {
    // console.log(index, student);
    return student.name;
  }

  toggleElement(): void {
    this.toggle = !this.toggle;
  }
}
