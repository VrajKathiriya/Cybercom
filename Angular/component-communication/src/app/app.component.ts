import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChildComponent } from './child/child.component';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  disable: boolean = false;
  message: any = '';

  title = 'app component data';
  items: any[] = ['hi', 'by', 'tata'];

  @ViewChild(ChildComponent) child: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(
      (message) => (this.message = message)
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.items = this.child.childData;
    }, 3000);
  }

  addItem(newItem: any) {
    console.log(this.items);
    this.items.push(newItem);
    console.log(this.items);
  }

  changeMessage() {
    this.dataService.changeMessage(this.title);
  }

  makeDisable() {
    this.disable = !this.disable;
  }
}
