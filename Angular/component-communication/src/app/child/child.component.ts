import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  // you can get parent data using @Input decorater which was passed by parent component
  message: any;
  childData = ['1', '2', '3'];
  @Input() dataFromParent: any;
  @Input() items: any;

  @Output() addItem = new EventEmitter<string>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(
      (message) => (this.message = message)
    );
  }

  sendItem(val: any) {
    this.addItem.emit(val);
  }
}
