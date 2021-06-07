import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { EndPoints } from './endpoints/end-points';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login';
import { RegisterUser } from '../models/register-user';
import { AuthenticateResponse } from '../models/authenticate-response';
import { UserResetPassword } from '../models/user-reset-password';
import { ResolveStart, Router } from '@angular/router';

import { ResponseData } from '../models/response/response-data';
import { ConfirmCodeResponse } from '../models/confirm-code-response';
import { PaginatedResponse } from '../models/response/paginated-reponse';
import { UserProfile } from '../models/user-profile';
import { AuthService } from './auth.service';
import * as _ from 'lodash';


@Injectable(
  {
    providedIn: 'root',
  }
)
export class UserService {
  public currentUserSubject: BehaviorSubject<AuthenticateResponse> | null = new  BehaviorSubject<AuthenticateResponse>(new AuthenticateResponse());
  public currentUser: Observable<AuthenticateResponse> | null=null;



  constructor(
    private http: HttpClient, 
    private baseService: BaseService,
    private authService: AuthService,
     private router: Router) {
    this.currentUserSubject = new BehaviorSubject<AuthenticateResponse>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();

   
  }

  public get currentUserValue(): AuthenticateResponse | undefined {
    if(this.authService.isAuthenticated()){
      this.currentUserSubject = new BehaviorSubject<AuthenticateResponse>(JSON.parse(localStorage.getItem('currentUser') || '{}'));

    }
    return this.currentUserSubject?.value;
  }

  

  public getUserFullName() {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return currentUser.name;
    }

    return 'Album';

  }

  // tslint:disable-next-line:typedef
  public currentUserSetValue(value:any)  {
    this.currentUserSubject?.next(value);
    localStorage.setItem('currentUser', JSON.stringify(value));

  }

 

  public isAuthorized() {
    const currentUser = this.currentUserValue;
    if (!_.isEmpty(currentUser)) {
      // logged in so return true
      return true;
    }

    return false;

  }

  public hasRole(role:string) {
    if (this.currentUserValue != null) {
      let roles = this.currentUserValue.roles;
      if (roles != null) {
        return this.isAuthorized() && roles.filter(p => p.toLowerCase() == role.toLowerCase()).length > 0;
      }
      else {
        return false;
      }
    }
    else{
      return false;
    }
  }

  // tslint:disable-next-line: typedef
  login(login: Login):Observable<ResponseData<AuthenticateResponse>> {

    return this.baseService.post<AuthenticateResponse>(
      login,
      environment.serverBaseUrl,
      EndPoints.USERS + '/login'
    );
  }




  // tslint:disable-next-line: typedef
  register(register: RegisterUser) {
    return this.baseService.post<any>(
      register,
      environment.serverBaseUrl,
      EndPoints.USERS + '/register'
    );
  }




  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  
    this.router.navigate(["/"]);

    this.currentUserSubject=null;
  }
}
