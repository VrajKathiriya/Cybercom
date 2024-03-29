import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders = [
    {
      id: '001',
      date: '2024-03-25',
      status: 'shipped',
      total: '$50.00',
      payment: 'credit card',
    },
    {
      id: '002',
      date: '2024-03-23',
      status: 'processing',
      total: '$30.00',
      payment: 'paypal',
    },
    {
      id: '003',
      date: '2024-03-20',
      status: 'delivered',
      total: '$70.00',
      payment: 'cash on delivery',
    },
  ];

  ngOnInit(): void {}
}
