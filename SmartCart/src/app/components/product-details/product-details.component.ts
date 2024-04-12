import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnChanges {
  baseUrl: string = 'http://localhost:1337';
  @Output() productDetailsChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() product: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      console.log(changes['product'].currentValue);
    }
  }

  ngOnInit(): void {
    console.log(this.product);
    const openModelDiv = document.getElementById('exampleModal');
    if (openModelDiv) {
      openModelDiv.style.display = 'block';
    }
  }

  closeProductDetailsModal() {
    const closeModalDiv = document.getElementById('exampleModal');
    if (closeModalDiv) {
      closeModalDiv.style.display = 'none';
    }
    this.productDetailsChange.emit(false);
  }
}
