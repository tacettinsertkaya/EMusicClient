import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Auth } from '../models/entity/auth';
import { environment } from '../../environments/environment';
import { EndPoints } from './endpoints/end-points'
import { Login } from '../models/entity/login';
import { BaseService } from './base.service';
import * as _ from 'lodash';
import { ForgotPassword } from '../models/entity/forgot-password';

import { AuthenticateResponse } from '../models/authenticate-response';
import { RegisterUser } from '../models/register-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user: Auth = new Auth();

  constructor(
    private http: HttpClient,
    private router: Router,
    private baseService: BaseService
  ) {

  }


  public isAuthenticated(): boolean {
    let userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // Check whether the token is expired and return
    // true or false
     
    if (!_.isEmpty(userData)) {
      let date = new Date();
      let expireDate = userData.expiration;

      let expiredDate = expireDate;
      let nowDate = date.toISOString();
    
      if (expiredDate >= nowDate) {
        
        return true;
      }

      else {

        return false;
      
      }
    }
    else {
      return false;
    }

  }

  public getUserName() {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.user.userName;
  }

  public removeToken() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    return true;
  }





  // tslint:disable-next-line: typedef
  forgotpassword(reset: ForgotPassword) {
    return this.baseService.post<any>(
      reset,
      environment.serverBaseUrl,
      EndPoints.AUTH + '/forget-password'
    );
  }




  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('currentUser');
  }

  // tslint:disable-next-line: typedef
  register(user: RegisterUser) {
    return this.baseService.post<any>(
      user,
      environment.serverBaseUrl,
      EndPoints.AUTH + '/register'
    );
  }


  // tslint:disable-next-line: typedef
  login(login: Login) {
    return this.baseService.post<AuthenticateResponse>(
      login,
      environment.serverBaseUrl,
      EndPoints.AUTH + '/login'
    );
  }






}