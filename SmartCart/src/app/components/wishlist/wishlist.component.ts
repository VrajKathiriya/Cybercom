import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  wishlist = [
    {
      name: 'Product 1',
      description: 'Description of Product 1.',
      price: 19.99,
    },
    {
      name: 'Product 2',
      description: 'Description of Product 2.',
      price: 29.99,
    },
    {
      name: 'Product 3',
      description: 'Description of Product 3.',
      price: 39.99,
    },
  ];
}
