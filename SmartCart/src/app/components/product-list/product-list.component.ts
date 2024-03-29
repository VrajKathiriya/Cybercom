import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products = [
    {
      product_id: 1,
      title: 'Product 1',
      description: 'Description of Product 1.',
      price: '$19.99',
      category: 'Category 1',
      image: 'https://example.com/product1.jpg',
    },
    {
      product_id: 2,
      title: 'Product 2',
      description: 'Description of Product 2.',
      price: '$29.99',
      category: 'Category 2',
      image: 'https://example.com/product2.jpg',
    },
    {
      product_id: 3,
      title: 'Product 3',
      description: 'Description of Product 3.',
      price: '$39.99',
      category: 'Category 3',
      image: 'https://example.com/product3.jpg',
    },
    {
      product_id: 4,
      title: 'Product 4',
      description: 'Description of Product 4.',
      price: '$109.99',
      category: 'Category 2',
      image: 'https://example.com/product10.jpg',
    },
    {
      product_id: 5,
      title: 'Product 5',
      description: 'Description of Product 1.',
      price: '$19.99',
      category: 'Category 1',
      image: 'https://example.com/product1.jpg',
    },
    {
      product_id: 6,
      title: 'Product 6',
      description: 'Description of Product 2.',
      price: '$29.99',
      category: 'Category 2',
      image: 'https://example.com/product2.jpg',
    },
    {
      product_id: 7,
      title: 'Product 7',
      description: 'Description of Product 3.',
      price: '$39.99',
      category: 'Category 3',
      image: 'https://example.com/product3.jpg',
    },
    {
      product_id: 8,
      title: 'Product 8',
      description: 'Description of Product 4.',
      price: '$109.99',
      category: 'Category 2',
      image: 'https://example.com/product10.jpg',
    },
    {
      product_id: 9,
      title: 'Product 9',
      description: 'Description of Product 1.',
      price: '$19.99',
      category: 'Category 1',
      image: 'https://example.com/product1.jpg',
    },
    {
      product_id: 10,
      title: 'Product 10',
      description: 'Description of Product 2.',
      price: '$29.99',
      category: 'Category 2',
      image: 'https://example.com/product2.jpg',
    },
    {
      product_id: 11,
      title: 'Product 11',
      description: 'Description of Product 3.',
      price: '$39.99',
      category: 'Category 3',
      image: 'https://example.com/product3.jpg',
    },
    {
      product_id: 12,
      title: 'Product 12',
      description: 'Description of Product 4.',
      price: '$109.99',
      category: 'Category 2',
      image: 'https://example.com/product10.jpg',
    },
    {
      product_id: 13,
      title: 'Product 13',
      description: 'Description of Product 1.',
      price: '$19.99',
      category: 'Category 1',
      image: 'https://example.com/product1.jpg',
    },
    {
      product_id: 14,
      title: 'Product 14',
      description: 'Description of Product 2.',
      price: '$29.99',
      category: 'Category 2',
      image: 'https://example.com/product2.jpg',
    },
    {
      product_id: 15,
      title: 'Product 15',
      description: 'Description of Product 3.',
      price: '$39.99',
      category: 'Category 3',
      image: 'https://example.com/product3.jpg',
    },
    {
      product_id: 16,
      title: 'Product 16',
      description: 'Description of Product 4.',
      price: '$109.99',
      category: 'Category 3',
      image: 'https://example.com/product10.jpg',
    },
  ];

  newProducts = [...this.products];

  categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

  constructor() {}

  ngOnInit(): void {}

  lowValue: number = 0;
  highValue: number = 4;

  pageSize = 4;
  pageSizeOptions: number[] = [4, 8, 12, 24];

  onPageSizeChange(event: any): void {
    this.pageSize = event.pageSize;
  }

  getPaginatorData(event: any): any {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  onCategoryChange(event: any): any {
    this.newProducts = this.products.filter(
      (product) => product.category == event.value
    );
    this.lowValue = 0;
    this.highValue = this.lowValue + this.pageSize;

    return event;
  }
}
