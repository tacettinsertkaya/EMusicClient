import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CustomValidators } from 'src/app/helpers/validators/custom-validators';
import { RegisterUser } from 'src/app/models/register-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!:FormGroup;
  user: RegisterUser=new RegisterUser();


  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService

  ) {
    this.addSignUpForm();
   }

  ngOnInit(): void {
  }

  addSignUpForm(): void {
    this.signUpForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', Validators.compose([Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        // check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, {
          hasNumber: true
        }),
        // check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true
        }),
        // check whether the entered password has a lower case letter
        CustomValidators.patternValidator(/[a-z]/, {
          hasSmallCase: true
        }),
        // check whether the entered password has a special character
        CustomValidators.patternValidator(
          /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          {
            hasSpecialCharacters: true
          }
        ),
        Validators.minLength(8)
      ])),
      statu: new FormControl('User', [Validators.required, Validators.minLength(2)]),
    });
  }

  

  saveUser() {
    const userCurrentValue = this.userService.currentUserValue;
 

    if (this.signUpForm?.invalid) {
      return;
    }
    if (this.signUpForm?.valid) {
        let data = Object.assign({}, this.signUpForm.value);
        
        this.user.userName=data.email;
        this.user.name=data.name;
        this.user.surname=data.surname;
        this.user.email=data.email;
        this.user.password=data.password;
        this.user.statu=data.statu;
    

        this.userService
          .register(this.user)
          .pipe(first())
          .subscribe(
            (res) => {
              this.router.navigate(["/auth/signin"]);
            },
            (error) => {

            }
          );


     
    }
  }


}
