import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private authService: AuthService) {
    this.isLoggedIn();
  }

  private profileSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    'none'
  );
  public userProfile$: Observable<any> = this.profileSubject.asObservable();

  isLoggedIn() {
    this.authService.getUserProfile().subscribe({
      next: (res: any) => {
        console.log(res);
        this.profileSubject.next(res);
      },
      error: (res: any) => {
        console.log(res);
        this.profileSubject.next('none');
      },
    });
  }
}
