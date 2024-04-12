import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginService {
  constructor(private authService: AuthService) {
    // this.isLoggedIn();
  }

  private loginSubject: BehaviorSubject<any> = new BehaviorSubject<any>('none');
  public userRole$: Observable<any> = this.loginSubject.asObservable();

  isLoggedIn() {
    this.authService.getUserProfile().subscribe({
      next: (res: any) => {
        console.log(res);
        this.loginSubject.next(res.role);
      },
      error: (res: any) => {
        console.log(res);
        this.loginSubject.next('none');
      },
    });
  }
}
