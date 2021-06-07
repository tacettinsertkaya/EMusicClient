import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage:string='';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signInAddForm();
  }


  // tslint:disable-next-line:typedef
  signInAddForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [
        Validators.required
      ]],
      password: ['',
        [
          Validators.required,

        ]],
    });
  }



  signIn() {
    if (this.signinForm?.invalid) {
      return;
    }


    if (this.signinForm?.valid) {
      let data = Object.assign({}, this.signinForm.value);



      this.userService
        .login(data)
        .pipe(first())
        .subscribe(
          (res) => {

            if (res.succeeded) {

              localStorage.setItem('currentUser', JSON.stringify(res.data));
              localStorage.setItem('token', res.data.token);
              this.userService.currentUserSetValue(res.data);


              this.router.navigate(["/"]);

            }
            else {
              this.errorMessage='Email or password wrong ';

            }





          },
          (error) => {

          }
        );


    }
  }



  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.userService.currentUserSetValue(null);
  }

}
