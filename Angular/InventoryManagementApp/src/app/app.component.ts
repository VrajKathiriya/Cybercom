import { Component, OnInit } from '@angular/core';
import { CheckLoginService } from './core/services/shared/check-login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'InventoryManagementApp';
  constructor(
    private checkLoginService: CheckLoginService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkLoginService.isLoggedIn();
  }
}
