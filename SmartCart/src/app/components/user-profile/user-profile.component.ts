import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  updateAddressToggle = false;

  addressForm = new FormGroup({
    address_line_1: new FormControl('', [Validators.required]),
    address_line_2: new FormControl('', [Validators.required]),
    landmark: new FormControl('', [Validators.required]),
  });

  updateAddressForm = new FormGroup({
    address_line_1: new FormControl('', [Validators.required]),
    address_line_2: new FormControl('', [Validators.required]),
    landmark: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserDetails().subscribe({
      next: (res: any) => {
        console.log(res);
        this.user = res;
        console.log(this.user.user_addresses.length);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  addAddress() {
    const address = {
      data: {
        user_details: this.user.id,
        address_line_1: this.addressForm.value.address_line_1,
        address_line_2: this.addressForm.value.address_line_2,
        landmark: this.addressForm.value.landmark,
        isDefault: true,
        city: null,
      },
    };

    this.addressService.postAddress(address).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  editAddress() {
    this.updateAddressToggle = !this.updateAddressToggle;

    this.updateAddressForm.patchValue({
      address_line_1: this.user.user_addresses[0].address_line_1,
      address_line_2: this.user.user_addresses[0].address_line_2,
      landmark: this.user.user_addresses[0].landmark,
    });
  }

  updateAddress(addressId: any) {
    const address = {
      data: {
        user_details: this.user.id,
        address_line_1: this.updateAddressForm.value.address_line_1,
        address_line_2: this.updateAddressForm.value.address_line_2,
        landmark: this.updateAddressForm.value.landmark,
        isDefault: true,
        city: null,
      },
    };

    this.addressService.updateAddress(address, addressId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.updateAddressToggle = false;
        console.log(this.user);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
