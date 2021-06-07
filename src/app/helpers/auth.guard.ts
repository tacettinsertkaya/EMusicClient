

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticateResponse } from '../models/authenticate-response';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    public currentUserSubject: BehaviorSubject<AuthenticateResponse> | null=null;
    public currentUser: Observable<AuthenticateResponse> | null=null;
    isUser:boolean=false;

    constructor(
        private router: Router,
        private authService:AuthService,
        private userService: UserService
    ) {
        
    this.currentUserSubject = new BehaviorSubject<AuthenticateResponse>(JSON.parse(localStorage.getItem('currentUser') || '{}') );
    this.currentUser = this.currentUserSubject.asObservable();

     }

     
  public get currentUserValue(): AuthenticateResponse  | null{
    return this.currentUserSubject ? this.currentUserSubject.value : null;
  }

  existUser() {
    this.isUser=this.userService.hasRole("Member");
 }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuthenticated()) {
            // logged in so return true
            
            return true;
        }

       
            
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/signin'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
