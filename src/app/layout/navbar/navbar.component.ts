import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
  }

  isLogged(){
   return  this.userService.isAuthorized();
  }

  userName(){
    return this.userService.getUserFullName();
  }
  logout(){
    this.userService.logout();
  }
}
